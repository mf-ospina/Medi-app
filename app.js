/* =====================================================================
   Plataforma Centralizada de Medicamentos — Lógica de negocio
   Archivos del proyecto:  index.html (estructura)  ·  app.js (lógica)  ·  data.json (datos)

   Carga de datos: intenta fetch('data.json'). Si el navegador lo bloquea
   (abrir index.html con doble clic usa file://), usa FALLBACK_DATA, una
   copia idéntica de data.json que va al final de este archivo.
   ===================================================================== */

const RESERVA_MS = 2 * 60 * 60 * 1000; // la reserva garantiza el medicamento por 2 horas

/* ---------- Estado en memoria ---------- */
let DB = null;       // catálogo: medicamentos, droguerías, pacientes, fórmulas
let INV = [];        // inventario: una fila por medicamento × droguería
let RESERVAS = [];   // reservas activas (con temporizador)
let ESPERA = [];     // fila virtual (lista de espera) por medicamento
let CEDULA_ACTUAL = null;
let notifTimer = null;
let tickCount = 0;

const $ = (id) => document.getElementById(id);

/* ---------- Carga de datos ---------- */
async function loadData() {
  try {
    const res = await fetch("data.json", { cache: "no-store" });
    if (!res.ok) throw new Error("HTTP " + res.status);
    return await res.json();
  } catch (err) {
    console.warn("No se pudo leer data.json (normal al abrir con doble clic). Usando datos embebidos.", err);
    return JSON.parse(JSON.stringify(FALLBACK_DATA));
  }
}

function initState(data) {
  const now = Date.now();
  DB = data;
  INV = data.inventario.map((r) => ({
    medicamentoId: r.medicamentoId,
    drogueriaId: r.drogueriaId,
    estado: r.estado,
    unidades: r.unidades,
    ultimoReporte: now - r.ultimoReporteHaceMin * 60000
  }));
  RESERVAS = data.reservas.map((r) => ({
    id: r.id,
    cedula: r.cedula,
    medicamentoId: r.medicamentoId,
    drogueriaId: r.drogueriaId,
    expiraEn: now + r.minutosRestantes * 60000
  }));
  ESPERA = data.listaEspera.map((e) => ({
    cedula: e.cedula,
    medicamentoId: e.medicamentoId,
    desde: now - e.enEsperaHaceMin * 60000
  }));
}

/* ---------- Helpers de dominio ---------- */
const getMed = (id) => DB.medicamentos.find((m) => m.id === id);
const getStore = (id) => DB.droguerias.find((d) => d.id === String(id));
const getPaciente = (ced) => DB.pacientes.find((p) => p.cedula === ced);
const medLabel = (m) => `${m.nombre} (${m.presentacion})`;
const maskCedula = (c) => "C.C. ****" + c.slice(-4);

const findRow = (medId, storeId) =>
  INV.find((r) => r.medicamentoId === medId && r.drogueriaId === String(storeId));
const activeReserva = (medId, storeId) =>
  RESERVAS.find((r) => r.medicamentoId === medId && r.drogueriaId === String(storeId));
const visibleState = (row) => (activeReserva(row.medicamentoId, row.drogueriaId) ? "Reservado" : row.estado);

const queueFor = (medId) => ESPERA.filter((e) => e.medicamentoId === medId).sort((a, b) => a.desde - b.desde);
const queuePos = (cedula, medId) => queueFor(medId).findIndex((e) => e.cedula === cedula) + 1;

function fmtCountdown(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const p = (n) => String(n).padStart(2, "0");
  return `${p(Math.floor(s / 3600))}:${p(Math.floor((s % 3600) / 60))}:${p(s % 60)}`;
}

function relTime(ts) {
  const min = Math.floor((Date.now() - ts) / 60000);
  if (min < 1) return "hace instantes";
  if (min < 60) return `hace ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `hace ${h} h`;
  return `hace ${Math.floor(h / 24)} d`;
}

const STATE_BADGE = {
  "Disponible": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  "Bajo stock": "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  "Reservado":  "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300",
  "Agotado":    "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300"
};
const badge = (estado) =>
  `<span class="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATE_BADGE[estado]}">${estado}</span>`;

/* ---------- Tema claro / oscuro ---------- */
function applyTheme(dark) {
  document.documentElement.classList.toggle("dark", dark);
  $("themeIcon").className = dark ? "fa-solid fa-sun text-amber-400" : "fa-solid fa-moon text-amber-500";
  $("themeText").textContent = dark ? "Modo Claro" : "Modo Oscuro";
}
function toggleDarkMode() {
  const dark = !document.documentElement.classList.contains("dark");
  applyTheme(dark);
  try { localStorage.setItem("pcm_tema", dark ? "dark" : "light"); } catch (e) { /* sin persistencia */ }
}

/* ---------- Pestañas ---------- */
const TAB_ACTIVE = ["border-brand-600", "text-brand-600", "dark:text-brand-500"];
const TAB_INACTIVE = ["border-transparent", "text-gray-500", "hover:text-gray-700", "dark:text-gray-400", "dark:hover:text-gray-200"];

function switchTab(name) {
  ["ciudadano", "inventario", "dashboard"].forEach((t) => {
    const active = t === name;
    $("sec-" + t).classList.toggle("hidden", !active);
    const btn = $("tab-" + t);
    TAB_ACTIVE.forEach((c) => btn.classList.toggle(c, active));
    TAB_INACTIVE.forEach((c) => btn.classList.toggle(c, !active));
  });
  renderAll();
}

/* ---------- Notificación global ---------- */
const NOTIF_COLORS = {
  success: { icon: "fa-circle-check",         cls: "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-200" },
  info:    { icon: "fa-circle-info",          cls: "bg-sky-50 border-sky-200 text-sky-800 dark:bg-sky-900/30 dark:border-sky-800 dark:text-sky-200" },
  warning: { icon: "fa-triangle-exclamation", cls: "bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/30 dark:border-amber-800 dark:text-amber-200" },
  error:   { icon: "fa-circle-xmark",         cls: "bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-900/30 dark:border-rose-800 dark:text-rose-200" }
};

function showNotification(message, type = "info") {
  const box = $("globalNotification");
  Object.values(NOTIF_COLORS).forEach((c) => box.classList.remove(...c.cls.split(" ")));
  const cfg = NOTIF_COLORS[type] || NOTIF_COLORS.info;
  box.classList.add(...cfg.cls.split(" "));
  $("notifIcon").className = `fa-solid ${cfg.icon} text-lg`;
  $("notifMessage").textContent = message;
  box.classList.remove("hidden");
  clearTimeout(notifTimer);
  notifTimer = setTimeout(hideNotification, 8000);
}
function hideNotification() {
  $("globalNotification").classList.add("hidden");
}

/* ---------- Reglas de negocio: reservas y fila virtual ---------- */
// Si hay existencias en la droguería y alguien espera en la fila, se le asigna una reserva de 2 h automáticamente.
function processWaitlist(medId, storeId) {
  const row = findRow(medId, storeId);
  if (!row || row.estado === "Agotado" || activeReserva(medId, storeId)) return null;
  const next = queueFor(medId)[0];
  if (!next) return null;
  ESPERA = ESPERA.filter((e) => e !== next);
  const reserva = {
    id: "R-" + String(Date.now()).slice(-6),
    cedula: next.cedula,
    medicamentoId: medId,
    drogueriaId: String(storeId),
    expiraEn: Date.now() + RESERVA_MS
  };
  RESERVAS.push(reserva);
  return reserva;
}

const describeAssignment = (r) =>
  `Asignación prioritaria: reserva de 2 h generada para ${maskCedula(r.cedula)} en ${getStore(r.drogueriaId).nombre}.`;

function reservar(medId, storeId) {
  const row = findRow(medId, storeId);
  if (!row || visibleState(row) === "Agotado" || visibleState(row) === "Reservado") {
    return showNotification("Esa droguería ya no tiene unidades disponibles para reservar.", "error");
  }
  if (RESERVAS.some((r) => r.cedula === CEDULA_ACTUAL && r.medicamentoId === medId)) {
    return showNotification("Ya tienes una reserva activa para este medicamento.", "warning");
  }
  RESERVAS.push({
    id: "R-" + String(Date.now()).slice(-6),
    cedula: CEDULA_ACTUAL,
    medicamentoId: medId,
    drogueriaId: String(storeId),
    expiraEn: Date.now() + RESERVA_MS
  });
  renderAll();
  showNotification(`Reserva confirmada: ${medLabel(getMed(medId))} en ${getStore(storeId).nombre}. Tienes 2 horas para reclamarlo.`, "success");
}

function cancelarReserva(medId, storeId) {
  RESERVAS = RESERVAS.filter((r) => !(r.cedula === CEDULA_ACTUAL && r.medicamentoId === medId && r.drogueriaId === String(storeId)));
  const asign = processWaitlist(medId, storeId);
  renderAll();
  showNotification("Reserva cancelada." + (asign ? " " + describeAssignment(asign) : ""), "info");
}

function unirseFila(medId) {
  if (queuePos(CEDULA_ACTUAL, medId)) return;
  ESPERA.push({ cedula: CEDULA_ACTUAL, medicamentoId: medId, desde: Date.now() });
  renderAll();
  showNotification(`Te uniste a la fila virtual de ${getMed(medId).nombre}. Posición ${queuePos(CEDULA_ACTUAL, medId)}.`, "info");
}

function salirFila(medId) {
  ESPERA = ESPERA.filter((e) => !(e.cedula === CEDULA_ACTUAL && e.medicamentoId === medId));
  renderAll();
  showNotification("Saliste de la fila virtual.", "info");
}

/* ---------- Pestaña 1: Consulta ciudadana ---------- */
function loadPatientData() {
  renderPatient();
  const pac = getPaciente(CEDULA_ACTUAL);
  const n = DB.formulas.filter((f) => f.cedula === CEDULA_ACTUAL).length;
  showNotification(`Se encontraron ${n} fórmulas vigentes para ${pac.nombre}.`, "info");
}

function renderPatient() {
  CEDULA_ACTUAL = $("userSelect").value;
  const pac = getPaciente(CEDULA_ACTUAL);
  const formulas = DB.formulas.filter((f) => f.cedula === CEDULA_ACTUAL);
  $("patientBadge").textContent = `${pac.eps} · ${formulas.length} fórmulas`;
  $("formulasList").innerHTML = formulas.length
    ? formulas.map(formulaCard).join("")
    : `<p class="text-sm text-gray-500">No hay fórmulas vigentes para este paciente.</p>`;
}

function formulaCard(f) {
  const med = getMed(f.medicamentoId);
  const miReserva = RESERVAS.find((r) => r.cedula === CEDULA_ACTUAL && r.medicamentoId === med.id);
  const pos = queuePos(CEDULA_ACTUAL, med.id);

  const filas = DB.droguerias.map((d) => {
    const row = findRow(med.id, d.id);
    const estado = row ? visibleState(row) : "Agotado";
    let accion = "";
    if (miReserva && miReserva.drogueriaId === d.id) {
      accion = `<span class="text-xs font-semibold text-sky-700 dark:text-sky-300"><i class="fa-regular fa-clock mr-1"></i><span data-countdown="${miReserva.expiraEn}">${fmtCountdown(miReserva.expiraEn - Date.now())}</span></span>
                <button data-action="cancelar" data-med="${med.id}" data-store="${d.id}" class="text-xs px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition">Cancelar</button>`;
    } else if (!miReserva && !pos && (estado === "Disponible" || estado === "Bajo stock")) {
      accion = `<button data-action="reservar" data-med="${med.id}" data-store="${d.id}" class="text-xs px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium transition">Reservar 2 h</button>`;
    }
    return `
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2.5">
        <div>
          <p class="text-sm font-medium">${d.nombre}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">${d.ciudad}</p>
        </div>
        <div class="flex items-center gap-3">${badge(estado)}${accion}</div>
      </div>`;
  }).join("");

  const hayExistencias = DB.droguerias.some((d) => {
    const row = findRow(med.id, d.id);
    return row && (visibleState(row) === "Disponible" || visibleState(row) === "Bajo stock");
  });

  let pie = "";
  if (miReserva) {
    pie = `<div class="mt-3 p-3 rounded-lg text-xs bg-sky-50 text-sky-800 dark:bg-sky-900/30 dark:text-sky-200"><i class="fa-solid fa-circle-check mr-1"></i>Reserva activa en ${getStore(miReserva.drogueriaId).nombre}. Reclama tu medicamento antes de que expire.</div>`;
  } else if (pos) {
    pie = `<div class="mt-3 p-3 rounded-lg text-xs flex items-center justify-between gap-3 bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
             <span><i class="fa-solid fa-hourglass-half mr-1"></i>Estás en la fila virtual · posición ${pos}. Se te asignará una reserva automáticamente cuando haya existencias.</span>
             <button data-action="salir-fila" data-med="${med.id}" class="px-3 py-1.5 rounded-lg border border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition shrink-0">Salir de la fila</button>
           </div>`;
  } else if (!hayExistencias) {
    pie = `<div class="mt-3 p-3 rounded-lg text-xs flex items-center justify-between gap-3 bg-rose-50 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200">
             <span><i class="fa-solid fa-triangle-exclamation mr-1"></i>Sin existencias en la red de droguerías.</span>
             <button data-action="fila" data-med="${med.id}" class="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium transition shrink-0">Unirme a la fila virtual</button>
           </div>`;
  }

  return `
    <article class="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
      <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
        <div>
          <h3 class="font-bold">${medLabel(med)}</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">${f.posologia} · Cantidad: ${f.cantidad}</p>
        </div>
        <div class="text-xs text-gray-500 dark:text-gray-400 sm:text-right">
          <p>Fórmula ${f.id}</p>
          <p>Vigente hasta ${f.vigenteHasta}</p>
        </div>
      </div>
      <div class="mt-3 divide-y divide-gray-100 dark:divide-gray-700/60">${filas}</div>
      ${pie}
    </article>`;
}

/* ---------- Pestaña 2: Gestión de inventario ---------- */
function handleStockUpdate(ev) {
  ev.preventDefault();
  const medId = $("invMedSelect").value;
  const storeId = $("invStoreSelect").value;
  const estado = $("invStatusSelect").value;

  let row = findRow(medId, storeId);
  if (!row) {
    row = { medicamentoId: medId, drogueriaId: storeId, estado, unidades: 0, ultimoReporte: Date.now() };
    INV.push(row);
  }
  row.estado = estado;
  row.unidades = unidadesParaEstado(estado, row.unidades);
  row.ultimoReporte = Date.now();

  let msg = `Stock actualizado: ${medLabel(getMed(medId))} en ${getStore(storeId).nombre} ahora figura como "${estado}".`;
  let type = "success";
  const asign = processWaitlist(medId, storeId);
  if (asign) {
    msg += " " + describeAssignment(asign);
  } else if (estado === "Agotado") {
    msg += " Se generó una alerta de desabastecimiento para SuperSalud.";
    type = "warning";
  }
  if (activeReserva(medId, storeId) && !asign) msg += " La reserva vigente se mantiene.";

  renderAll();
  showNotification(msg, type);
}

function renderInventoryTable() {
  const filtro = $("statusFilter").value;
  const filas = INV
    .map((row) => ({ row, estado: visibleState(row) }))
    .filter((x) => filtro === "TODOS" || x.estado === filtro);

  $("inventoryTableBody").innerHTML = filas.length
    ? filas.map(({ row, estado }) => {
        const med = getMed(row.medicamentoId);
        const st = getStore(row.drogueriaId);
        const res = activeReserva(row.medicamentoId, row.drogueriaId);
        let detalle;
        if (res) {
          detalle = `<i class="fa-regular fa-clock mr-1 text-sky-600 dark:text-sky-400"></i>${maskCedula(res.cedula)} · expira en <span class="font-mono font-semibold" data-countdown="${res.expiraEn}">${fmtCountdown(res.expiraEn - Date.now())}</span>`;
        } else if (estado === "Agotado") {
          const n = queueFor(row.medicamentoId).length;
          detalle = `Sin existencias · ${n} en fila virtual`;
        } else if (estado === "Bajo stock") {
          detalle = "Reposición recomendada";
        } else {
          detalle = "Existencias normales";
        }
        return `
          <tr>
            <td class="px-4 py-3 font-medium">${medLabel(med)}</td>
            <td class="px-4 py-3">${st.nombre} <span class="text-xs text-gray-500 dark:text-gray-400">(${st.ciudad})</span></td>
            <td class="px-4 py-3">${badge(estado)}</td>
            <td class="px-4 py-3 text-xs text-gray-600 dark:text-gray-300">${detalle}</td>
            <td class="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">${relTime(row.ultimoReporte)}</td>
          </tr>`;
      }).join("")
    : `<tr><td colspan="5" class="px-4 py-8 text-center text-sm text-gray-500">No hay registros con ese estado.</td></tr>`;
}

/* ---------- Pestaña 3: Dashboard institucional ---------- */
function renderDashboard() {
  renderPrediction();
  $("kpiActiveReservations").textContent = RESERVAS.length;
  $("kpiWaitlistCount").textContent = ESPERA.length;
  $("kpiShortageAlerts").textContent = INV.filter((r) => r.estado === "Agotado").length;

  const lista = [...ESPERA].sort((a, b) => a.desde - b.desde);
  $("waitlistDashboardView").innerHTML = lista.length
    ? lista.map((e) => `
        <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/40 rounded-xl border border-gray-200 dark:border-gray-600">
          <div>
            <p class="text-sm font-semibold">${maskCedula(e.cedula)}</p>
            <p class="text-xs text-gray-600 dark:text-gray-300">${medLabel(getMed(e.medicamentoId))}</p>
          </div>
          <div class="text-right">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">Posición ${queuePos(e.cedula, e.medicamentoId)}</span>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">${relTime(e.desde)}</p>
          </div>
        </div>`).join("")
    : `<p class="text-sm text-gray-500 dark:text-gray-400 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center">No hay ciudadanos en fila virtual.</p>`;
}

/* ---------- Predicción de desabastecimiento (regresión lineal) ---------- */
// El formulario solo captura el estado; para la simulación se asigna un nivel de unidades representativo.
function unidadesParaEstado(estado, actual) {
  if (estado === "Agotado") return 0;
  if (estado === "Bajo stock") return actual > 0 && actual <= 40 ? actual : 25;
  return actual >= 100 ? actual : 150; // Disponible
}

const RISK = {
  alto:  { label: "Riesgo alto",  badge: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",          line: "text-rose-600 dark:text-rose-400",       accion: "Reponer de inmediato y alertar a SuperSalud" },
  medio: { label: "Riesgo medio", badge: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",      line: "text-amber-600 dark:text-amber-400",     accion: "Programar reposición esta semana" },
  bajo:  { label: "Riesgo bajo",  badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300", line: "text-emerald-600 dark:text-emerald-400", accion: "Sin acción requerida" }
};

// Mínimos cuadrados: y = intercepto + pendiente·x  (x = día, y = unidades en la red). R² mide qué tan lineal es la tendencia.
function linearRegression(ys) {
  const n = ys.length;
  const mx = (n - 1) / 2;
  const my = ys.reduce((a, b) => a + b, 0) / n;
  let sxy = 0, sxx = 0, syy = 0;
  ys.forEach((y, x) => { sxy += (x - mx) * (y - my); sxx += (x - mx) ** 2; syy += (y - my) ** 2; });
  const slope = sxx ? sxy / sxx : 0;
  const r2 = syy ? (sxy * sxy) / (sxx * syy) : 1;
  return { slope, r2 };
}

const HORIZONTE_DIAS = 60; // más allá de este plazo la proyección lineal no es confiable: se considera estable

function predictMed(medId) {
  const hist = (DB.historial && DB.historial[medId]) || [];
  const actual = INV.filter((r) => r.medicamentoId === medId).reduce((s, r) => s + (r.unidades || 0), 0);
  const ys = [...hist, actual]; // el último punto es "hoy", tomado del inventario en vivo
  const { slope, r2 } = linearRegression(ys);
  let dias = null; // null = tendencia estable o al alza, no hay agotamiento proyectado
  if (actual <= 0) dias = 0;
  else if (slope < -0.5 && actual / -slope <= HORIZONTE_DIAS) dias = actual / -slope;
  const nivel = dias !== null && dias <= 3 ? "alto" : dias !== null && dias <= 10 ? "medio" : "bajo";
  return { medId, actual, ys, slope, r2, dias, nivel };
}

function sparkline(p) {
  const W = 120, H = 32, ext = 5; // se proyectan 5 días hacia adelante
  const total = p.ys.length - 1 + ext;
  const lastI = p.ys.length - 1;
  const endY = Math.max(0, p.ys[lastI] + p.slope * ext);
  const maxY = Math.max(1, ...p.ys);
  const px = (i) => ((i / total) * W).toFixed(1);
  const py = (v) => (H - 2 - (v / maxY) * (H - 4)).toFixed(1);
  const pts = p.ys.map((v, i) => `${px(i)},${py(v)}`).join(" ");
  return `<svg viewBox="0 0 ${W} ${H}" class="w-full h-8" aria-hidden="true">
    <polyline points="${pts}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <line x1="${px(lastI)}" y1="${py(p.ys[lastI])}" x2="${px(total)}" y2="${py(endY)}" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3" opacity=".7"/>
  </svg>`;
}

function renderPrediction() {
  const list = $("predictionList");
  if (!list) return;
  const preds = DB.medicamentos
    .map((m) => predictMed(m.id))
    .sort((a, b) => (a.dias ?? Infinity) - (b.dias ?? Infinity));

  const altos = preds.filter((p) => p.nivel === "alto").length;
  const medios = preds.filter((p) => p.nivel === "medio").length;
  $("predictionSummary").textContent = `${altos} en riesgo alto · ${medios} en riesgo medio`;

  list.innerHTML = preds.map((p) => {
    const med = getMed(p.medId);
    const rk = RISK[p.nivel];
    const diasTxt = p.dias === null ? "Estable" : p.dias === 0 ? "Agotado" : `${p.dias.toFixed(1)} días`;
    const tend = `${p.slope >= 0 ? "+" : ""}${p.slope.toFixed(1)} u/día`;
    return `
      <div class="grid grid-cols-1 md:grid-cols-12 items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/40 rounded-xl border border-gray-200 dark:border-gray-600">
        <div class="md:col-span-4">
          <p class="text-sm font-semibold">${medLabel(med)}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">${p.actual} unidades en la red · ${rk.accion}</p>
        </div>
        <div class="md:col-span-2">
          <p class="text-xs text-gray-500 dark:text-gray-400">Tendencia</p>
          <p class="text-sm font-mono font-semibold">${tend}</p>
          <p class="text-xs text-gray-400 dark:text-gray-500">Ajuste R² ${p.r2.toFixed(2)}</p>
        </div>
        <div class="md:col-span-2">
          <p class="text-xs text-gray-500 dark:text-gray-400">Se agota en</p>
          <p class="text-sm font-bold">${diasTxt}</p>
        </div>
        <div class="md:col-span-2 ${rk.line}">${sparkline(p)}</div>
        <div class="md:col-span-2 md:text-right">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${rk.badge}"><i class="fa-solid fa-circle text-[8px] mr-1.5"></i>${rk.label}</span>
        </div>
      </div>`;
  }).join("");
}

/* ---------- Render global y temporizador ---------- */
function renderAll() {
  renderPatient();
  renderInventoryTable();
  renderDashboard();
}

function tick() {
  const now = Date.now();
  const vencidas = RESERVAS.filter((r) => r.expiraEn <= now);
  if (vencidas.length) {
    RESERVAS = RESERVAS.filter((r) => r.expiraEn > now);
    const asignaciones = vencidas.map((r) => processWaitlist(r.medicamentoId, r.drogueriaId)).filter(Boolean);
    renderAll();
    let msg = `Venció ${vencidas.length === 1 ? "una reserva" : vencidas.length + " reservas"} y se liberó el stock.`;
    if (asignaciones.length) msg += " " + asignaciones.map(describeAssignment).join(" ");
    showNotification(msg, "warning");
  }
  document.querySelectorAll("[data-countdown]").forEach((el) => {
    el.textContent = fmtCountdown(Number(el.dataset.countdown) - now);
  });
  if (++tickCount % 30 === 0) renderAll(); // refresca los "hace X min"
}

/* ---------- Arranque ---------- */
async function init() {
  let dark = false;
  try { dark = localStorage.getItem("pcm_tema") === "dark"; } catch (e) { /* sin persistencia */ }
  applyTheme(dark);

  initState(await loadData());

  $("formulasList").addEventListener("click", (ev) => {
    const btn = ev.target.closest("[data-action]");
    if (!btn) return;
    const { action, med, store } = btn.dataset;
    if (action === "reservar") reservar(med, store);
    else if (action === "cancelar") cancelarReserva(med, store);
    else if (action === "fila") unirseFila(med);
    else if (action === "salir-fila") salirFila(med);
  });

  renderAll();
  setInterval(tick, 1000);
}

/* Copia de respaldo de data.json (se usa solo si fetch() no está disponible, p. ej. file://) */
const FALLBACK_DATA = {
  "medicamentos": [
    {
      "id": "LOS50",
      "nombre": "Losartán 50mg",
      "presentacion": "Tableta"
    },
    {
      "id": "INS100",
      "nombre": "Insulina Glargina",
      "presentacion": "Inyectable"
    },
    {
      "id": "AMX500",
      "nombre": "Amoxicilina 500mg",
      "presentacion": "Cápsula"
    },
    {
      "id": "AC500",
      "nombre": "Acetaminofén 500mg",
      "presentacion": "Tableta"
    }
  ],
  "droguerias": [
    {
      "id": "1",
      "nombre": "Audifarma Calle 72",
      "ciudad": "Bogotá"
    },
    {
      "id": "2",
      "nombre": "Cafam Fontibón",
      "ciudad": "Bogotá"
    },
    {
      "id": "3",
      "nombre": "Cruz Verde Chapinero",
      "ciudad": "Bogotá"
    }
  ],
  "pacientes": [
    {
      "cedula": "1020304050",
      "nombre": "Sandra Milena Duarte Marín",
      "eps": "EPS Sanitas",
      "ciudad": "Bogotá"
    },
    {
      "cedula": "1019283746",
      "nombre": "Raúl Andrés Sánchez Mondragón",
      "eps": "Nueva EPS",
      "ciudad": "Bogotá"
    }
  ],
  "formulas": [
    {
      "id": "MP-20261020-0148",
      "cedula": "1020304050",
      "medicamentoId": "LOS50",
      "cantidad": 30,
      "posologia": "1 tableta cada 12 horas",
      "fechaPrescripcion": "2026-10-20",
      "vigenteHasta": "2026-11-19"
    },
    {
      "id": "MP-20261020-0149",
      "cedula": "1020304050",
      "medicamentoId": "INS100",
      "cantidad": 1,
      "posologia": "10 UI por vía subcutánea cada noche",
      "fechaPrescripcion": "2026-10-20",
      "vigenteHasta": "2026-11-19"
    },
    {
      "id": "MP-20261020-0150",
      "cedula": "1020304050",
      "medicamentoId": "AC500",
      "cantidad": 20,
      "posologia": "1 tableta cada 8 horas si hay dolor",
      "fechaPrescripcion": "2026-10-20",
      "vigenteHasta": "2026-11-19"
    },
    {
      "id": "MP-20261026-0231",
      "cedula": "1019283746",
      "medicamentoId": "AMX500",
      "cantidad": 21,
      "posologia": "1 cápsula cada 8 horas por 7 días",
      "fechaPrescripcion": "2026-10-26",
      "vigenteHasta": "2026-11-25"
    },
    {
      "id": "MP-20261026-0232",
      "cedula": "1019283746",
      "medicamentoId": "INS100",
      "cantidad": 1,
      "posologia": "8 UI por vía subcutánea cada noche",
      "fechaPrescripcion": "2026-10-26",
      "vigenteHasta": "2026-11-25"
    }
  ],
  "inventario": [
    {
      "medicamentoId": "LOS50",
      "drogueriaId": "1",
      "unidades": 180,
      "estado": "Disponible",
      "ultimoReporteHaceMin": 12
    },
    {
      "medicamentoId": "LOS50",
      "drogueriaId": "2",
      "unidades": 25,
      "estado": "Bajo stock",
      "ultimoReporteHaceMin": 47
    },
    {
      "medicamentoId": "LOS50",
      "drogueriaId": "3",
      "unidades": 140,
      "estado": "Disponible",
      "ultimoReporteHaceMin": 5
    },
    {
      "medicamentoId": "INS100",
      "drogueriaId": "1",
      "unidades": 0,
      "estado": "Agotado",
      "ultimoReporteHaceMin": 130
    },
    {
      "medicamentoId": "INS100",
      "drogueriaId": "2",
      "unidades": 0,
      "estado": "Agotado",
      "ultimoReporteHaceMin": 95
    },
    {
      "medicamentoId": "INS100",
      "drogueriaId": "3",
      "unidades": 0,
      "estado": "Agotado",
      "ultimoReporteHaceMin": 210
    },
    {
      "medicamentoId": "AMX500",
      "drogueriaId": "1",
      "unidades": 90,
      "estado": "Disponible",
      "ultimoReporteHaceMin": 22
    },
    {
      "medicamentoId": "AMX500",
      "drogueriaId": "2",
      "unidades": 60,
      "estado": "Disponible",
      "ultimoReporteHaceMin": 31
    },
    {
      "medicamentoId": "AMX500",
      "drogueriaId": "3",
      "unidades": 15,
      "estado": "Bajo stock",
      "ultimoReporteHaceMin": 78
    },
    {
      "medicamentoId": "AC500",
      "drogueriaId": "1",
      "unidades": 0,
      "estado": "Agotado",
      "ultimoReporteHaceMin": 180
    },
    {
      "medicamentoId": "AC500",
      "drogueriaId": "2",
      "unidades": 30,
      "estado": "Bajo stock",
      "ultimoReporteHaceMin": 64
    },
    {
      "medicamentoId": "AC500",
      "drogueriaId": "3",
      "unidades": 0,
      "estado": "Agotado",
      "ultimoReporteHaceMin": 150
    }
  ],
  "reservas": [
    {
      "id": "R-0001",
      "cedula": "1019283746",
      "medicamentoId": "AMX500",
      "drogueriaId": "3",
      "minutosRestantes": 78
    }
  ],
  "listaEspera": [
    {
      "cedula": "1019283746",
      "medicamentoId": "INS100",
      "enEsperaHaceMin": 35
    }
  ],
  "historial": {
    "_nota": "Existencias totales en la red por día, de hace 14 días hasta ayer (datos simulados). El punto de hoy se calcula del inventario actual.",
    "LOS50": [
      360,
      355,
      362,
      350,
      358,
      352,
      349,
      355,
      348,
      351,
      346,
      350,
      347,
      349
    ],
    "INS100": [
      90,
      80,
      75,
      70,
      60,
      55,
      45,
      40,
      30,
      25,
      15,
      10,
      5,
      0
    ],
    "AMX500": [
      520,
      480,
      455,
      420,
      390,
      365,
      335,
      310,
      285,
      260,
      235,
      215,
      195,
      180
    ],
    "AC500": [
      400,
      360,
      330,
      290,
      255,
      225,
      190,
      160,
      130,
      105,
      85,
      65,
      50,
      40
    ]
  }
};
init();
