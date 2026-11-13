# Ruta 20 — Gestión de transporte

Mini proyecto académico de Mauricio Varela para el microtaller 20. Aplicación estática en español para registrar recorridos, vehículos, distancias y costos, con dashboard interactivo.

## Problema
Cuando los recorridos y los gastos de transporte se anotan de forma dispersa, cuesta determinar cuánto se viajó, qué vehículos se usaron y dónde se concentra el gasto. Ruta 20 organiza esa bitácora y facilita revisar costos y kilómetros para apoyar el control de la operación.

## Qué incluye

- 24 registros de ejemplo ficticios, preparados para la demostración académica.
- Formulario de alta y edición con validación, confirmación al eliminar y búsqueda en la bitácora.
- Persistencia en `localStorage` del navegador, opción para restaurar los registros ficticios y exportación CSV.
- Dashboard con cuatro KPI: recorridos, kilómetros, costos totales y costo por kilómetro.
- Cuatro gráficos dinámicos: costo diario, kilómetros por vehículo, distribución de costo por tipo y costo por kilómetro según vehículo.
- Tres conclusiones que cambian con los filtros activos.
- Guía del problema, alcance, evidencia del taller, instrucciones de GitHub Pages y guion de video de aproximadamente dos minutos.

## Tecnología y estructura

El sitio funciona completamente con HTML, CSS y JavaScript del navegador. No ejecuta Python ni necesita un backend, inicio de sesión o paquetes externos para las características principales. Los datos editados se guardan localmente en el navegador donde se usó el sitio; no se sincronizan entre visitantes.

- `index.html`: pantallas, formulario y contenido académico.
- `styles.css`: identidad visual Panel Nocturno y diseño adaptable.
- `app.js`: registros, filtros, cálculos, gráficos, exportación y almacenamiento local.
- `route20-logo.svg`: icono del proyecto.
- `manus-routes.json`: ruta declarada para la vista previa.
- `server.js` y `package.json`: servidor opcional de vista previa local.

## Vista previa local

Requiere Node.js solamente para levantar el servidor de prueba local:

```bash
npm run dev
```

Luego abre `http://localhost:3000`. Para la publicación en GitHub Pages no se instala ni ejecuta Node en el sitio publicado: Pages sirve directamente `index.html` y sus recursos estáticos.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub y sube `index.html`, `styles.css`, `app.js` y `route20-logo.svg` a la raíz.
2. En el repositorio, abre **Settings → Pages**.
3. En **Build and deployment**, elige **Deploy from a branch**, selecciona `main` y la carpeta `/(root)`, y guarda.
4. Espera a que Pages publique el sitio. Copia el enlace que GitHub muestra en esa sección y compártelo con el profesor.

## Datos de muestra

Las rutas y costos son ficticios e ilustrativos; se usan únicamente con fines académicos. Si se reemplazan por información real, usa solo datos autorizados y evita incluir información privada innecesaria.
