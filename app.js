const FALLBACK_DATA = {
  "medicamentos": [
    {
      "id": "m1",
      "nombre": "Acetaminofén 500mg",
      "categoria": "Analgésico / Antipirético"
    },
    {
      "id": "m2",
      "nombre": "Ibuprofeno 400mg",
      "categoria": "Antiinflamatorio"
    },
    {
      "id": "m3",
      "nombre": "Amoxicilina 500mg",
      "categoria": "Antibiótico"
    },
    {
      "id": "m4",
      "nombre": "Losartán 50mg",
      "categoria": "Antihipertensivo"
    },
    {
      "id": "m5",
      "nombre": "Metformina 850mg",
      "categoria": "Antidiabético"
    },
    {
      "id": "m6",
      "nombre": "Salbutamol Inhalador",
      "categoria": "Broncodilatador"
    },
    {
      "id": "m7",
      "nombre": "Omeprazol 20mg",
      "categoria": "Antiácido"
    },
    {
      "id": "m8",
      "nombre": "Insulina Glargina",
      "categoria": "Antidiabético (insulina)"
    },
    {
      "id": "m9",
      "nombre": "Loratadina 10mg",
      "categoria": "Antihistamínico"
    },
    {
      "id": "m10",
      "nombre": "Dexametasona 4mg",
      "categoria": "Corticosteroide"
    }
  ],
  "droguerias": [
    {
      "id": "d1",
      "nombre": "Farmatodo Chapinero",
      "ciudad": "Bogotá",
      "direccion": "Cra 13 #63-42",
      "telefono": "601-742-1190"
    },
    {
      "id": "d2",
      "nombre": "Cruz Verde Kennedy",
      "ciudad": "Bogotá",
      "direccion": "Av. Ciudad de Cali #38-15 Sur",
      "telefono": "601-450-2201"
    },
    {
      "id": "d3",
      "nombre": "Droguería La Rebaja Suba",
      "ciudad": "Bogotá",
      "direccion": "Cl 145 #91-30",
      "telefono": "601-681-9034"
    },
    {
      "id": "d4",
      "nombre": "Farmacia San Bernardo",
      "ciudad": "Bogotá",
      "direccion": "Cra 7 #182-40",
      "telefono": "601-678-2255"
    },
    {
      "id": "d5",
      "nombre": "Cafam Fontibón",
      "ciudad": "Bogotá",
      "direccion": "Cl 22 #96-15",
      "telefono": "601-263-4410"
    },
    {
      "id": "d6",
      "nombre": "Cruz Verde Laureles",
      "ciudad": "Medellín",
      "direccion": "Cra 70 #34-20",
      "telefono": "604-260-1188"
    },
    {
      "id": "d7",
      "nombre": "Farmatodo El Poblado",
      "ciudad": "Medellín",
      "direccion": "Cl 10 #40-15",
      "telefono": "604-311-7742"
    },
    {
      "id": "d8",
      "nombre": "Droguería Popular Belén",
      "ciudad": "Medellín",
      "direccion": "Cra 76 #33B-40",
      "telefono": "604-235-9012"
    },
    {
      "id": "d9",
      "nombre": "La Rebaja Bello",
      "ciudad": "Medellín",
      "direccion": "Cl 50 #45-30",
      "telefono": "604-461-2299"
    },
    {
      "id": "d10",
      "nombre": "Farmacias Pasteur Envigado",
      "ciudad": "Medellín",
      "direccion": "Cra 43A #35-20",
      "telefono": "604-339-5567"
    }
  ],
  "inventario": [
    {
      "id": "i1",
      "medicamentoId": "m1",
      "drogueriaId": "d1",
      "stock": "Agotado",
      "cantidad": 0,
      "ultimaActualizacion": "2026-09-22"
    },
    {
      "id": "i2",
      "medicamentoId": "m2",
      "drogueriaId": "d1",
      "stock": "Disponible",
      "cantidad": 340,
      "ultimaActualizacion": "2026-09-23"
    },
    {
      "id": "i3",
      "medicamentoId": "m3",
      "drogueriaId": "d1",
      "stock": "Bajo stock",
      "cantidad": 18,
      "ultimaActualizacion": "2026-09-21"
    },
    {
      "id": "i4",
      "medicamentoId": "m4",
      "drogueriaId": "d1",
      "stock": "Disponible",
      "cantidad": 210,
      "ultimaActualizacion": "2026-09-23"
    },
    {
      "id": "i5",
      "medicamentoId": "m7",
      "drogueriaId": "d1",
      "stock": "Disponible",
      "cantidad": 150,
      "ultimaActualizacion": "2026-09-20"
    },
    {
      "id": "i6",
      "medicamentoId": "m9",
      "drogueriaId": "d1",
      "stock": "Disponible",
      "cantidad": 400,
      "ultimaActualizacion": "2026-09-22"
    },
    {
      "id": "i7",
      "medicamentoId": "m1",
      "drogueriaId": "d2",
      "stock": "Agotado",
      "cantidad": 0,
      "ultimaActualizacion": "2026-09-23"
    },
    {
      "id": "i8",
      "medicamentoId": "m2",
      "drogueriaId": "d2",
      "stock": "Bajo stock",
      "cantidad": 22,
      "ultimaActualizacion": "2026-09-22"
    },
    {
      "id": "i9",
      "medicamentoId": "m5",
      "drogueriaId": "d2",
      "stock": "Disponible",
      "cantidad": 180,
      "ultimaActualizacion": "2026-09-21"
    },
    {
      "id": "i10",
      "medicamentoId": "m6",
      "drogueriaId": "d2",
      "stock": "Bajo stock",
      "cantidad": 9,
      "ultimaActualizacion": "2026-09-23"
    },
    {
      "id": "i11",
      "medicamentoId": "m8",
      "drogueriaId": "d2",
      "stock": "Agotado",
      "cantidad": 0,
      "ultimaActualizacion": "2026-09-20"
    },
    {
      "id": "i12",
      "medicamentoId": "m10",
      "drogueriaId": "d2",
      "stock": "Disponible",
      "cantidad": 95,
      "ultimaActualizacion": "2026-09-22"
    },
    {
      "id": "i13",
      "medicamentoId": "m1",
      "drogueriaId": "d3",
      "stock": "Bajo stock",
      "cantidad": 15,
      "ultimaActualizacion": "2026-09-23"
    },
    {
      "id": "i14",
      "medicamentoId": "m3",
      "drogueriaId": "d3",
      "stock": "Disponible",
      "cantidad": 260,
      "ultimaActualizacion": "2026-09-21"
    },
    {
      "id": "i15",
      "medicamentoId": "m4",
      "drogueriaId": "d3",
      "stock": "Bajo stock",
      "cantidad": 30,
      "ultimaActualizacion": "2026-09-22"
    },
    {
      "id": "i16",
      "medicamentoId": "m7",
      "drogueriaId": "d3",
      "stock": "Disponible",
      "cantidad": 190,
      "ultimaActualizacion": "2026-09-23"
    },
    {
      "id": "i17",
      "medicamentoId": "m9",
      "drogueriaId": "d3",
      "stock": "Agotado",
      "cantidad": 0,
      "ultimaActualizacion": "2026-09-19"
    },
    {
      "id": "i18",
      "medicamentoId": "m10",
      "drogueriaId": "d3",
      "stock": "Disponible",
      "cantidad": 70,
      "ultimaActualizacion": "2026-09-22"
    },
    {
      "id": "i19",
      "medicamentoId": "m1",
      "drogueriaId": "d4",
      "stock": "Agotado",
      "cantidad": 0,
      "ultimaActualizacion": "2026-09-22"
    },
    {
      "id": "i20",
      "medicamentoId": "m2",
      "drogueriaId": "d4",
      "stock": "Disponible",
      "cantidad": 300,
      "ultimaActualizacion": "2026-09-23"
    },
    {
      "id": "i21",
      "medicamentoId": "m5",
      "drogueriaId": "d4",
      "stock": "Bajo stock",
      "cantidad": 25,
      "ultimaActualizacion": "2026-09-20"
    },
    {
      "id": "i22",
      "medicamentoId": "m6",
      "drogueriaId": "d4",
      "stock": "Disponible",
      "cantidad": 60,
      "ultimaActualizacion": "2026-09-23"
    },
    {
      "id": "i23",
      "medicamentoId": "m8",
      "drogueriaId": "d4",
      "stock": "Bajo stock",
      "cantidad": 12,
      "ultimaActualizacion": "2026-09-21"
    },
    {
      "id": "i24",
      "medicamentoId": "m1",
      "drogueriaId": "d5",
      "stock": "Disponible",
      "cantidad": 220,
      "ultimaActualizacion": "2026-09-23"
    },
    {
      "id": "i25",
      "medicamentoId": "m3",
      "drogueriaId": "d5",
      "stock": "Bajo stock",
      "cantidad": 20,
      "ultimaActualizacion": "2026-09-22"
    },
    {
      "id": "i26",
      "medicamentoId": "m4",
      "drogueriaId": "d5",
      "stock": "Disponible",
      "cantidad": 180,
      "ultimaActualizacion": "2026-09-23"
    },
    {
      "id": "i27",
      "medicamentoId": "m7",
      "drogueriaId": "d5",
      "stock": "Agotado",
      "cantidad": 0,
      "ultimaActualizacion": "2026-09-18"
    },
    {
      "id": "i28",
      "medicamentoId": "m9",
      "drogueriaId": "d5",
      "stock": "Disponible",
      "cantidad": 310,
      "ultimaActualizacion": "2026-09-22"
    },
    {
      "id": "i29",
      "medicamentoId": "m10",
      "drogueriaId": "d5",
      "stock": "Bajo stock",
      "cantidad": 14,
      "ultimaActualizacion": "2026-09-21"
    },
    {
      "id": "i30",
      "medicamentoId": "m1",
      "drogueriaId": "d6",
      "stock": "Agotado",
      "cantidad": 0,
      "ultimaActualizacion": "2026-09-23"
    },
    {
      "id": "i31",
      "medicamentoId": "m2",
      "drogueriaId": "d6",
      "stock": "Disponible",
      "cantidad": 280,
      "ultimaActualizacion": "2026-09-22"
    },
    {
      "id": "i32",
      "medicamentoId": "m5",
      "drogueriaId": "d6",
      "stock": "Disponible",
      "cantidad": 200,
      "ultimaActualizacion": "2026-09-23"
    },
    {
      "id": "i33",
      "medicamentoId": "m6",
      "drogueriaId": "d6",
      "stock": "Agotado",
      "cantidad": 0,
      "ultimaActualizacion": "2026-09-20"
    },
    {
      "id": "i34",
      "medicamentoId": "m8",
      "drogueriaId": "d6",
      "stock": "Bajo stock",
      "cantidad": 10,
      "ultimaActualizacion": "2026-09-22"
    },
    {
      "id": "i35",
      "medicamentoId": "m1",
      "drogueriaId": "d7",
      "stock": "Bajo stock",
      "cantidad": 12,
      "ultimaActualizacion": "2026-09-23"
    },
    {
      "id": "i36",
      "medicamentoId": "m3",
      "drogueriaId": "d7",
      "stock": "Disponible",
      "cantidad": 240,
      "ultimaActualizacion": "2026-09-22"
    },
    {
      "id": "i37",
      "medicamentoId": "m4",
      "drogueriaId": "d7",
      "stock": "Disponible",
      "cantidad": 195,
      "ultimaActualizacion": "2026-09-23"
    },
    {
      "id": "i38",
      "medicamentoId": "m7",
      "drogueriaId": "d7",
      "stock": "Disponible",
      "cantidad": 175,
      "ultimaActualizacion": "2026-09-21"
    },
    {
      "id": "i39",
      "medicamentoId": "m9",
      "drogueriaId": "d7",
      "stock": "Bajo stock",
      "cantidad": 28,
      "ultimaActualizacion": "2026-09-22"
    },
    {
      "id": "i40",
      "medicamentoId": "m10",
      "drogueriaId": "d7",
      "stock": "Disponible",
      "cantidad": 88,
      "ultimaActualizacion": "2026-09-23"
    },
    {
      "id": "i41",
      "medicamentoId": "m1",
      "drogueriaId": "d8",
      "stock": "Agotado",
      "cantidad": 0,
      "ultimaActualizacion": "2026-09-22"
    },
    {
      "id": "i42",
      "medicamentoId": "m2",
      "drogueriaId": "d8",
      "stock": "Agotado",
      "cantidad": 0,
      "ultimaActualizacion": "2026-09-19"
    },
    {
      "id": "i43",
      "medicamentoId": "m5",
      "drogueriaId": "d8",
      "stock": "Bajo stock",
      "cantidad": 16,
      "ultimaActualizacion": "2026-09-21"
    },
    {
      "id": "i44",
      "medicamentoId": "m6",
      "drogueriaId": "d8",
      "stock": "Disponible",
      "cantidad": 45,
      "ultimaActualizacion": "2026-09-23"
    },
    {
      "id": "i45",
      "medicamentoId": "m8",
      "drogueriaId": "d8",
      "stock": "Agotado",
      "cantidad": 0,
      "ultimaActualizacion": "2026-09-18"
    },
    {
      "id": "i46",
      "medicamentoId": "m1",
      "drogueriaId": "d9",
      "stock": "Disponible",
      "cantidad": 260,
      "ultimaActualizacion": "2026-09-23"
    },
    {
      "id": "i47",
      "medicamentoId": "m3",
      "drogueriaId": "d9",
      "stock": "Bajo stock",
      "cantidad": 19,
      "ultimaActualizacion": "2026-09-22"
    },
    {
      "id": "i48",
      "medicamentoId": "m4",
      "drogueriaId": "d9",
      "stock": "Disponible",
      "cantidad": 205,
      "ultimaActualizacion": "2026-09-23"
    },
    {
      "id": "i49",
      "medicamentoId": "m7",
      "drogueriaId": "d9",
      "stock": "Disponible",
      "cantidad": 160,
      "ultimaActualizacion": "2026-09-22"
    },
    {
      "id": "i50",
      "medicamentoId": "m9",
      "drogueriaId": "d9",
      "stock": "Disponible",
      "cantidad": 340,
      "ultimaActualizacion": "2026-09-23"
    },
    {
      "id": "i51",
      "medicamentoId": "m10",
      "drogueriaId": "d9",
      "stock": "Agotado",
      "cantidad": 0,
      "ultimaActualizacion": "2026-09-17"
    },
    {
      "id": "i52",
      "medicamentoId": "m1",
      "drogueriaId": "d10",
      "stock": "Agotado",
      "cantidad": 0,
      "ultimaActualizacion": "2026-09-23"
    },
    {
      "id": "i53",
      "medicamentoId": "m2",
      "drogueriaId": "d10",
      "stock": "Disponible",
      "cantidad": 310,
      "ultimaActualizacion": "2026-09-22"
    },
    {
      "id": "i54",
      "medicamentoId": "m5",
      "drogueriaId": "d10",
      "stock": "Disponible",
      "cantidad": 175,
      "ultimaActualizacion": "2026-09-23"
    },
    {
      "id": "i55",
      "medicamentoId": "m6",
      "drogueriaId": "d10",
      "stock": "Bajo stock",
      "cantidad": 11,
      "ultimaActualizacion": "2026-09-21"
    },
    {
      "id": "i56",
      "medicamentoId": "m8",
      "drogueriaId": "d10",
      "stock": "Disponible",
      "cantidad": 40,
      "ultimaActualizacion": "2026-09-22"
    }
  ]
};
/* ============================================================
   Plataforma Centralizada de Disponibilidad de Medicamentos
   Prototipo funcional — sin backend, todo corre en el navegador.

   Carga de datos:
   1) Intenta fetch('./data.json') — funciona si el archivo se sirve
      desde un servidor local (recomendado: `python3 -m http.server`).
   2) Si el navegador bloquea fetch() por abrir el archivo con
      doble clic (protocolo file://), usa FALLBACK_DATA, una copia
      idéntica embebida más abajo, para que el prototipo funcione
      siempre "tal cual", sin instalar nada.
   ============================================================ */

let STATE = {
  medicamentos: [],
  droguerias: [],
  inventario: []
};

const STORAGE_KEY = "cdm_inventario_editado_v1";

const STATUS_ORDER = ["Agotado", "Bajo stock", "Disponible"];

const STATUS_STYLES = {
  "Disponible": {
    badge: "bg-status-okBg text-status-okText border border-status-okBorder",
    dot: "bg-status-okText",
    border: "border-l-status-okText"
  },
  "Bajo stock": {
    badge: "bg-status-lowBg text-status-lowText border border-status-lowBorder",
    dot: "bg-status-lowText",
    border: "border-l-status-lowText"
  },
  "Agotado": {
    badge: "bg-status-outBg text-status-outText border border-status-outBorder",
    dot: "bg-status-outText",
    border: "border-l-status-outText"
  }
};

function medNombre(id) {
  const m = STATE.medicamentos.find((x) => x.id === id);
  return m ? m.nombre : id;
}

function drogNombre(id) {
  const d = STATE.droguerias.find((x) => x.id === id);
  return d ? d : null;
}

function fmtFecha(iso) {
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d)) return iso;
  return d.toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" });
}

async function loadData() {
  // 1. ¿Hay ediciones guardadas de una sesión anterior en este navegador?
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      STATE = JSON.parse(saved);
      return;
    } catch (e) {
      /* si está corrupto, seguimos con la carga normal */
    }
  }

  // 2. Intentar cargar el archivo real data.json
  try {
    const res = await fetch("./data.json", { cache: "no-store" });
    if (!res.ok) throw new Error("HTTP " + res.status);
    STATE = await res.json();
    return;
  } catch (e) {
    console.warn("No se pudo leer data.json vía fetch (normal si abriste el archivo con doble clic). Usando dataset embebido de respaldo.", e);
  }

  // 3. Respaldo embebido — garantiza que el prototipo funcione siempre
  STATE = JSON.parse(JSON.stringify(FALLBACK_DATA));
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(STATE));
  } catch (e) {
    console.warn("No se pudo guardar en localStorage", e);
  }
}
/* ---------------------------------------------------------
   Navegación entre pestañas
   --------------------------------------------------------- */
function initTabs() {
  const buttons = document.querySelectorAll("[data-tab-btn]");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab-btn");
      buttons.forEach((b) => {
        const active = b === btn;
        b.setAttribute("aria-selected", active ? "true" : "false");
        b.classList.toggle("tab-active", active);
        b.classList.toggle("tab-inactive", !active);
      });
      document.querySelectorAll("[data-tab-panel]").forEach((p) => {
        p.classList.toggle("hidden", p.getAttribute("data-tab-panel") !== target);
      });
      if (target === "dashboard") renderDashboard();
      if (target === "gestion") renderGestionTabla();
    });
  });
}

/* ---------------------------------------------------------
   Pestaña 1 — Consulta ciudadana
   --------------------------------------------------------- */
function initConsulta() {
  const inputNombre = document.getElementById("consulta-nombre");
  const selectCiudad = document.getElementById("consulta-ciudad");

  // Sugerencias de medicamentos (datalist)
  const datalist = document.getElementById("lista-medicamentos");
  datalist.innerHTML = STATE.medicamentos
    .map((m) => `<option value="${m.nombre}"></option>`)
    .join("");

  inputNombre.addEventListener("input", renderConsulta);
  selectCiudad.addEventListener("change", renderConsulta);

  renderConsulta();
}

function renderConsulta() {
  const nombreFiltro = document.getElementById("consulta-nombre").value.trim().toLowerCase();
  const ciudadFiltro = document.getElementById("consulta-ciudad").value;
  const resultsEl = document.getElementById("consulta-resultados");
  const emptyEl = document.getElementById("consulta-vacio");
  const countEl = document.getElementById("consulta-contador");

  let filas = STATE.inventario
    .map((inv) => {
      const med = STATE.medicamentos.find((m) => m.id === inv.medicamentoId);
      const drog = STATE.droguerias.find((d) => d.id === inv.drogueriaId);
      return { inv, med, drog };
    })
    .filter(({ med, drog }) => med && drog)
    .filter(({ med }) => (nombreFiltro ? med.nombre.toLowerCase().includes(nombreFiltro) : true))
    .filter(({ drog }) => (ciudadFiltro ? drog.ciudad === ciudadFiltro : true));

  // Orden: primero lo disponible, para responder rápido "¿dónde sí hay?"
  filas.sort((a, b) => STATUS_ORDER.indexOf(a.inv.stock) - STATUS_ORDER.indexOf(b.inv.stock));
  // Dentro del mismo estado, priorizar disponibilidad y orden alfabético de droguería
  filas.sort((a, b) => {
    const diff = (STATUS_ORDER.indexOf(a.inv.stock) === 2 ? 0 : 1) - (STATUS_ORDER.indexOf(b.inv.stock) === 2 ? 0 : 1);
    return 0;
  });
  filas.sort((a, b) => {
    const rank = (s) => (s === "Disponible" ? 0 : s === "Bajo stock" ? 1 : 2);
    if (rank(a.inv.stock) !== rank(b.inv.stock)) return rank(a.inv.stock) - rank(b.inv.stock);
    return a.drog.nombre.localeCompare(b.drog.nombre);
  });

  countEl.textContent = filas.length === 1 ? "1 resultado" : `${filas.length} resultados`;

  if (filas.length === 0) {
    resultsEl.innerHTML = "";
    emptyEl.classList.remove("hidden");
    return;
  }
  emptyEl.classList.add("hidden");

  resultsEl.innerHTML = filas
    .map(({ inv, med, drog }) => {
      const s = STATUS_STYLES[inv.stock];
      return `
        <li class="border-l-4 ${s.border} bg-surface border border-border rounded-sm px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <p class="font-semibold text-ink">${drog.nombre}</p>
            <p class="text-sm text-ink/70">${med.nombre} · ${drog.ciudad}</p>
            <p class="text-sm text-ink/60">${drog.direccion} · ${drog.telefono}</p>
          </div>
          <div class="flex flex-col sm:items-end gap-1 shrink-0">
            <span class="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-sm ${s.badge}">
              <span class="w-1.5 h-1.5 rounded-full ${s.dot}"></span>${inv.stock}
            </span>
            <span class="text-xs font-mono text-ink/50">Actualizado ${fmtFecha(inv.ultimaActualizacion)}</span>
          </div>
        </li>`;
    })
    .join("");
}

/* ---------------------------------------------------------
   Pestaña 2 — Gestión de inventario
   --------------------------------------------------------- */
function initGestion() {
  const selectMed = document.getElementById("gestion-medicamento");
  const selectDrog = document.getElementById("gestion-drogueria");
  const form = document.getElementById("gestion-form");
  const filtroDrog = document.getElementById("gestion-filtro-drogueria");

  selectMed.innerHTML = STATE.medicamentos
    .map((m) => `<option value="${m.id}">${m.nombre}</option>`)
    .join("");
  selectDrog.innerHTML = STATE.droguerias
    .map((d) => `<option value="${d.id}">${d.nombre} (${d.ciudad})</option>`)
    .join("");
  filtroDrog.innerHTML =
    `<option value="">Todas las droguerías</option>` +
    STATE.droguerias.map((d) => `<option value="${d.id}">${d.nombre} (${d.ciudad})</option>`).join("");

  filtroDrog.addEventListener("change", renderGestionTabla);

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const medicamentoId = selectMed.value;
    const drogueriaId = selectDrog.value;
    const stock = document.getElementById("gestion-estado").value;
    const cantidadRaw = document.getElementById("gestion-cantidad").value;
    const cantidad = stock === "Agotado" ? 0 : Math.max(0, parseInt(cantidadRaw || "0", 10));

    let registro = STATE.inventario.find(
      (i) => i.medicamentoId === medicamentoId && i.drogueriaId === drogueriaId
    );
    const hoy = new Date().toISOString().slice(0, 10);

    if (registro) {
      registro.stock = stock;
      registro.cantidad = cantidad;
      registro.ultimaActualizacion = hoy;
    } else {
      registro = {
        id: "i" + Date.now(),
        medicamentoId,
        drogueriaId,
        stock,
        cantidad,
        ultimaActualizacion: hoy
      };
      STATE.inventario.push(registro);
    }

    persist();
    renderGestionTabla();
    showGestionConfirmacion(medNombre(medicamentoId), drogNombre(drogueriaId), stock);
    form.reset();
    selectMed.selectedIndex = 0;
    selectDrog.selectedIndex = 0;
    document.getElementById("gestion-estado").selectedIndex = 0;
  });

  // Reflejar cantidad = 0 automáticamente y deshabilitarla si el estado es "Agotado"
  document.getElementById("gestion-estado").addEventListener("change", (ev) => {
    const cantidadInput = document.getElementById("gestion-cantidad");
    if (ev.target.value === "Agotado") {
      cantidadInput.value = 0;
      cantidadInput.disabled = true;
    } else {
      cantidadInput.disabled = false;
      if (!cantidadInput.value) cantidadInput.value = 50;
    }
  });

  renderGestionTabla();
}

function showGestionConfirmacion(medNom, drog, estado) {
  const el = document.getElementById("gestion-confirmacion");
  el.textContent = `Stock actualizado: ${medNom} en ${drog ? drog.nombre : ""} ahora figura como "${estado}".`;
  el.classList.remove("hidden");
  clearTimeout(showGestionConfirmacion._t);
  showGestionConfirmacion._t = setTimeout(() => el.classList.add("hidden"), 4500);
}

function renderGestionTabla() {
  const tbody = document.getElementById("gestion-tabla-body");
  const filtro = document.getElementById("gestion-filtro-drogueria").value;
  if (!tbody) return;

  let filas = STATE.inventario
    .map((inv) => ({
      inv,
      med: STATE.medicamentos.find((m) => m.id === inv.medicamentoId),
      drog: STATE.droguerias.find((d) => d.id === inv.drogueriaId)
    }))
    .filter(({ med, drog }) => med && drog)
    .filter(({ drog }) => (filtro ? drog.id === filtro : true))
    .sort((a, b) => b.inv.ultimaActualizacion.localeCompare(a.inv.ultimaActualizacion));

  tbody.innerHTML = filas
    .map(({ inv, med, drog }) => {
      const s = STATUS_STYLES[inv.stock];
      return `
        <tr class="border-b border-border last:border-0">
          <td class="py-2.5 pr-4 font-medium text-ink">${med.nombre}</td>
          <td class="py-2.5 pr-4 text-ink/70">${drog.nombre} <span class="text-ink/40">· ${drog.ciudad}</span></td>
          <td class="py-2.5 pr-4">
            <span class="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-sm ${s.badge}">
              <span class="w-1.5 h-1.5 rounded-full ${s.dot}"></span>${inv.stock}
            </span>
          </td>
          <td class="py-2.5 pr-4 font-mono text-ink/70">${inv.cantidad}</td>
          <td class="py-2.5 font-mono text-ink/50">${fmtFecha(inv.ultimaActualizacion)}</td>
        </tr>`;
    })
    .join("") || `<tr><td colspan="5" class="py-6 text-center text-ink/50">Sin registros para este filtro.</td></tr>`;
}

/* ---------------------------------------------------------
   Pestaña 3 — Dashboard institucional
   --------------------------------------------------------- */
function renderDashboard() {
  const inv = STATE.inventario;
  const totalRegistros = inv.length;
  const agotados = inv.filter((i) => i.stock === "Agotado");
  const bajos = inv.filter((i) => i.stock === "Bajo stock");
  const disponibles = inv.filter((i) => i.stock === "Disponible");

  const drogueriasConAgotado = new Set(agotados.map((i) => i.drogueriaId));
  const pctDrogueriasAfectadas = STATE.droguerias.length
    ? Math.round((drogueriasConAgotado.size / STATE.droguerias.length) * 100)
    : 0;

  document.getElementById("kpi-agotados").textContent = agotados.length;
  document.getElementById("kpi-bajos").textContent = bajos.length;
  document.getElementById("kpi-disponibles").textContent = disponibles.length;
  document.getElementById("kpi-drogueriasAfectadas").textContent = `${drogueriasConAgotado.size} de ${STATE.droguerias.length} (${pctDrogueriasAfectadas}%)`;

  // Ranking de medicamentos con más puntos de desabastecimiento (agotado + bajo stock)
  const riesgoPorMed = {};
  STATE.medicamentos.forEach((m) => (riesgoPorMed[m.id] = { agotado: 0, bajo: 0, total: 0 }));
  inv.forEach((i) => {
    if (!riesgoPorMed[i.medicamentoId]) return;
    if (i.stock === "Agotado") riesgoPorMed[i.medicamentoId].agotado++;
    if (i.stock === "Bajo stock") riesgoPorMed[i.medicamentoId].bajo++;
  });
  const ranking = Object.entries(riesgoPorMed)
    .map(([id, v]) => ({ id, ...v, total: v.agotado + v.bajo }))
    .filter((r) => r.total > 0)
    .sort((a, b) => b.agotado - a.agotado || b.total - a.total)
    .slice(0, 6);

  const maxTotal = Math.max(1, ...ranking.map((r) => r.total));
  const rankingEl = document.getElementById("dash-ranking");
  rankingEl.innerHTML = ranking
    .map((r) => {
      const nombre = medNombre(r.id);
      const pctAgotado = (r.agotado / maxTotal) * 100;
      const pctBajo = (r.bajo / maxTotal) * 100;
      return `
        <li>
          <div class="flex items-baseline justify-between mb-1">
            <span class="text-sm font-medium text-ink">${nombre}</span>
            <span class="text-xs font-mono text-ink/50">${r.agotado} agotado · ${r.bajo} bajo stock</span>
          </div>
          <div class="h-2 w-full bg-bg rounded-sm overflow-hidden flex">
            <div class="h-full bg-status-outText" style="width:${pctAgotado}%"></div>
            <div class="h-full bg-status-lowText" style="width:${pctBajo}%"></div>
          </div>
        </li>`;
    })
    .join("") || `<li class="text-sm text-ink/50">No hay alertas de desabastecimiento registradas.</li>`;

  // Alertas por ciudad
  const ciudades = [...new Set(STATE.droguerias.map((d) => d.ciudad))];
  const alertasEl = document.getElementById("dash-alertas-ciudad");
  alertasEl.innerHTML = ciudades
    .map((ciudad) => {
      const drogIds = STATE.droguerias.filter((d) => d.ciudad === ciudad).map((d) => d.id);
      const agotadosCiudad = agotados.filter((i) => drogIds.includes(i.drogueriaId));
      const bajosCiudad = bajos.filter((i) => drogIds.includes(i.drogueriaId));
      const medsUnicos = new Set(agotadosCiudad.map((i) => i.medicamentoId));
      return `
        <div class="border border-border rounded-sm p-4 bg-surface">
          <p class="font-semibold text-ink mb-2">${ciudad}</p>
          <p class="text-sm text-ink/70">${agotadosCiudad.length} registros agotados · ${bajosCiudad.length} en bajo stock</p>
          <p class="text-sm text-ink/70">${medsUnicos.size} medicamento(s) distinto(s) agotados en la ciudad</p>
        </div>`;
    })
    .join("");

  // Registros críticos recientes (agotado, más reciente primero)
  const criticosEl = document.getElementById("dash-criticos");
  const criticos = [...agotados]
    .sort((a, b) => b.ultimaActualizacion.localeCompare(a.ultimaActualizacion))
    .slice(0, 8);
  criticosEl.innerHTML =
    criticos
      .map((i) => {
        const drog = STATE.droguerias.find((d) => d.id === i.drogueriaId);
        return `
        <li class="border-l-4 border-l-status-outText bg-surface border border-border rounded-sm px-4 py-2.5 flex items-center justify-between gap-3">
          <div>
            <p class="text-sm font-medium text-ink">${medNombre(i.medicamentoId)}</p>
            <p class="text-xs text-ink/60">${drog ? drog.nombre + " · " + drog.ciudad : ""}</p>
          </div>
          <span class="text-xs font-mono text-ink/50 shrink-0">${fmtFecha(i.ultimaActualizacion)}</span>
        </li>`;
      })
      .join("") || `<li class="text-sm text-ink/50">Sin desabastecimientos activos.</li>`;
}

/* ---------------------------------------------------------
   Arranque
   --------------------------------------------------------- */
async function init() {
  await loadData();
  initTabs();
  initConsulta();
  initGestion();
  renderDashboard();
  document.getElementById("app-loading").classList.add("hidden");
  document.getElementById("app-root").classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", init);
