# Plataforma Centralizada y Unificada de Disponibilidad de Medicamentos en Colombia

> **Asignatura:** Arquitectura Empresarial  
> **Institución:** Universidad Jorge Tadeo Lozano  
> **Programa:** Ingeniería de Sistemas  

---

##  Contexto y Problemática

En Colombia, el acceso oportuno a medicamentos es un factor crítico para la garantía del derecho fundamental a la salud (Ley Estatutaria 1751 de 2015). Actualmente, la información sobre el stock e inventarios de medicamentos se encuentra fragmentada entre múltiples actores (EPS, Gestores Farmacéuticos, IPS y Droguerías Institucionales), lo que genera desplazamientos innecesarios, barreras de acceso e interrupción de tratamientos en los pacientes.

Este proyecto responde al mandato de la **Corte Constitucional mediante el Auto 1282 de 2025** y las directrices del **Ministerio de Salud en la Circular Externa 044 de 2025**, los cuales exigen la implementación de un **sistema unificado, interoperable y de acceso público** para el monitoreo del abastecimiento de medicamentos y la trazabilidad de entregas en tiempo real.

---

## Objetivo del Proyecto y de la PoC

El objetivo de esta **Prueba de Concepto (PoC)** es validar la viabilidad técnica y arquitectónica de una solución digital centralizada que consolide los inventarios de los puntos de dispensación en Colombia, ofreciendo:
1. **Transparencia para el ciudadano:** Consulta en tiempo real de existencias antes de desplazarse.
2. **Interoperabilidad de datos:** Captura e ingesta de inventarios desde droguerías e instituciones de salud.
3. **Monitoreo y Alertas:** Un panel de control para entes de vigilancia (Minsalud, Supersalud) sobre alertas de desabastecimiento y demandas insatisfechas.

---

##  Estructura del Prototipo

El prototipo funcional se encuentra desarrollado utilizando **HTML5, JavaScript (ES6+) y Tailwind CSS**, garantizando una ejecución ligera sin dependencias pesadas ni necesidad de entornos de compilación.

La aplicación integra 3 componentes funcionales organizados por pestañas:

*  **Pestaña 1 - Consulta Ciudadana:** Buscador interactivo por medicamento, principio activo, ciudad y EPS. Muestra puntos de dispensación cercanos con indicador de stock (*Disponible*, *Bajo Stock*, *Agotado*).
*  **Pestaña 2 - Ingesta/Actualización de Inventario:** Formulario que simula la actualización en tiempo real del reporte de stock por parte de un gestor farmacéutico o droguería.
*  **Pestaña 3 - Dashboard Institucional:** Panel de indicadores (KPIs) y tabla de alertas de escasez/desabastecimiento para entes de control.

---

##  Estructura del Repositorio

```text
├── index.html                            # Interfaz principal del prototipo web
├── app.js                                # Lógica de estado dinámico y reactividad
├── data.json                             # Dataset simulado de medicamentos y droguerías
├── .gitignore                            # Archivos omitidos por Git
├── LICENSE                               # Licencia académica MIT
└── README.md                             # Descripción general del repositorio