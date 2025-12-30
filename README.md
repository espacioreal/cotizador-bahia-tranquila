# Cotizador de Seguros - Bahía Tranquila 🏡

Simulador Interactivo de Cotización de Seguros para Viviendas con gestión de Historial.

**Proyecto Final React - Carrera Front End**

---

## 📋 Descripción

Aplicación web desarrollada en React que permite cotizar seguros de hogar de manera interactiva. El sistema calcula costos basándose en la información de la propiedad y factores de riesgo específicos de **Bahía Blanca**, considerando eventos climáticos recientes.

**Novedades de esta versión:**
Se ha implementado un sistema de **historial de cotizaciones** persistente utilizando **Context API** para el manejo de estado global y **React Router** para la navegación, cumpliendo con los estándares de una Single Page Application (SPA).

---

## 🚀 Demo en vivo

GitHub Pages: [https://github.com/espacioreal/cotizador-bahia-tranquila/](https://github.com/espacioreal/cotizador-bahia-tranquila/)

---

## ✨ Características principales

- **Gestión de Estado Global:** Uso de `Context API` para manejar la data fluida entre componentes.
- **Navegación SPA:** Implementación de `react-router-dom` con rutas para Inicio e Historial sin recargas.
- **Persistencia de Datos:** El historial se guarda en `localStorage` para no perder las cotizaciones al cerrar el navegador.
- **Lógica de Negocio:** Factores de riesgo adaptados a zonas climáticas de Bahía Blanca (Viento/Tormenta).
- **Feedback Visual:** Validaciones en tiempo real y alertas de carga.

---

## 🛠 Tecnologías utilizadas

**Core:**
- React 19
- Vite
- React Router DOM (Routing)
- Context API (State Management)

**Estilos y UI:**
- CSS / Tailwind CSS
- Lucide React (Iconos)

**Calidad de Código:**
- ESLint

---

## 📂 Estructura del proyecto

```text
cotizador-bahia-tranquila/
│
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Header.jsx       # Navegación y logo
│   │   ├── Footer.jsx       # Pie de página
│   │   ├── Formulario.jsx   # Lógica del formulario
│   │   ├── Resultado.jsx    # Visualización de cotización
│   │   ├── Spinner.jsx      # Indicador de carga
│   │   └── AlertaBanner.jsx # Mensajes de validación
│   │
│   ├── context/             # Estado Global
│   │   └── CotizacionesContext.jsx  # Provider y lógica de historial
│   │
│   ├── pages/               # Vistas (Rutas)
│   │   ├── Home.jsx         # Página principal del cotizador
│   │   └── Historial.jsx    # Página de tabla de historial
│   │
│   ├── helpers/             # Utilidades
│   │   └── cotizador.js     # Algoritmos de cálculo y datos
│   │
│   ├── App.css              # Estilos del layout principal
│   ├── index.css            # Estilos globales y directivas
│   ├── App.jsx              # Configuración de Routing y Provider
│   └── main.jsx             # Punto de entrada
│
└── README.md
