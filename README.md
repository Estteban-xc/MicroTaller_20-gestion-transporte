# Ruta 20 — Gestión de transporte

Mini proyecto académico de **Mauricio Varela** para el microtaller 20. Es una aplicación web en español para registrar recorridos, vehículos, distancias y costos, y consultar esa información en un dashboard interactivo.

## Problema

Cuando los recorridos y los gastos de transporte se registran de forma dispersa, es difícil conocer la distancia recorrida, el uso de cada vehículo y la distribución de los costos. Ruta 20 organiza estos datos en una bitácora y los presenta mediante indicadores y gráficos que facilitan su análisis.

## Solución

La aplicación reúne en un mismo espacio el registro y la consulta de recorridos junto con un dashboard de análisis. Cada recorrido incluye fecha, vehículo, conductor, origen, destino, tipo de recorrido, kilómetros y costo.

El formulario permite agregar y editar registros, y la bitácora ofrece búsqueda, eliminación con confirmación y exportación de los datos en formato CSV.

## Dashboard

El tablero presenta cuatro indicadores clave:

- Cantidad de recorridos.
- Kilómetros recorridos.
- Costo total del transporte.
- Costo promedio por kilómetro.

También contiene cuatro gráficos dinámicos sobre costos diarios, kilómetros por vehículo, distribución de costos según el tipo de recorrido y costo por kilómetro de cada vehículo. Los filtros permiten consultar distintos periodos y vehículos. Las tres conclusiones del tablero cambian de acuerdo con los datos filtrados.

## Datos de ejemplo

La aplicación incluye 24 recorridos ficticios para demostrar sus funciones. Los datos son simulados y se utilizan exclusivamente con fines académicos; no representan viajes u operaciones reales.

## Tecnología

Ruta 20 está desarrollada con HTML, CSS y JavaScript. No requiere Python, inicio de sesión ni un backend para utilizar sus funciones principales. Los datos agregados o modificados se guardan en el almacenamiento local del navegador y no se sincronizan entre diferentes personas o dispositivos.

El sitio es estático y compatible con GitHub Pages. Cada visitante ve inicialmente los registros de ejemplo, mientras que los cambios realizados quedan guardados localmente en su propio navegador.

## Archivos principales

- `index.html`: estructura de la aplicación, formulario y contenido del proyecto.
- `styles.css`: diseño visual adaptable a escritorio y dispositivos móviles.
- `app.js`: registro y consulta de datos, filtros, cálculos, gráficos, conclusiones y exportación.
- `route20-logo.svg`: ícono de Ruta 20.
- `README.md`: descripción del proyecto y sus características.

`server.js` y `package.json` se incluyen para la vista previa local; no son necesarios para el funcionamiento de la versión estática publicada en GitHub Pages.
