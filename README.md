Cotizador de Seguros - Bahía Tranquila

Simulador Interactivo de Cotización de Seguros para Viviendas

Proyecto Final React - Carrera Front End | Argentina Programa

---

Descripción

Aplicación web desarrollada en React que permite cotizar seguros de hogar de manera interactiva. El sistema calcula y presenta dinámicamente distintas opciones de cobertura y costos basándose en la información personal y de propiedad ingresada por el usuario.

Este proyecto incorpora factores de riesgo específicos de Bahía Blanca, Buenos Aires, considerando los eventos climáticos recientes (temporales de viento y tormentas) que han afectado a la región.

---

Demo en vivo

GitHub Pages: [https://github.com/espacioreal/cotizador-bahia-tranquila/](https://github.com/espacioreal/cotizador-bahia-tranquila/)


---

Características principales

- Cotización instantánea basada en tipo de propiedad, ubicación y superficie
- Factores de riesgo locales adaptados a las condiciones climáticas de Bahía Blanca
- Desglose detallado de coberturas (base, viento, tormentas)
- Validaciones en tiempo real con feedback visual inmediato
- Diseño responsive optimizado para dispositivos móviles y desktop
- UI moderna con animaciones y transiciones suaves

---

Tecnologías utilizadas

Frontend
- React 18 - Librería principal
- Vite - Build tool y dev server
- Tailwind CSS - Framework de estilos utility-first
- Lucide React - Iconos modernos
- JavaScript ES6+ - Sintaxis moderna

Herramientas de desarrollo
- ESLint - Linting de código
- Git - Control de versiones
- GitHub Pages - Deployment

---

Estructura del proyecto
```
cotizador-bahia-tranquila/
│
├── public/                      Archivos públicos estáticos
│
├── src/
│   ├── components/              Componentes React
│   │   ├── Header.jsx          Barra de navegación
│   │   ├── AlertaBanner.jsx    Banner informativo
│   │   ├── Formulario.jsx      Formulario de cotización
│   │   ├── Spinner.jsx         Indicador de carga
│   │   └── Resultado.jsx       Visualización de resultados
│   │
│   ├── helpers/                 Lógica de negocio
│   │   └── cotizador.js        Cálculos y validaciones
│   │
│   ├── App.jsx                  Componente principal
│   ├── main.jsx                 Punto de entrada
│   └── index.css                Estilos globales + Tailwind
│
├── index.html                   HTML principal
├── package.json                 Dependencias y scripts
├── vite.config.js              Configuración de Vite
└── README.md                    Este archivo
```

---

Instalación y configuración

Requisitos previos

Antes de comenzar, asegurate de tener instalado:

- Node.js (versión 16 o superior) - [Descargar aquí](https://nodejs.org/)
- npm (se incluye con Node.js) o yarn
- Git - [Descargar aquí](https://git-scm.com/)

Pasos de instalación

#1. Clonar el repositorio

Utilizando GIT:
```bash
git clone https://github.com/espacioreal/cotizador-bahia-tranquila.git
```

O descargando el archivo ZIP desde el botón "Code" → "Download ZIP"

#2. Navegar al directorio del proyecto
```bash
cd cotizador-bahia-tranquila
```

#3. Instalar las dependencias

Utilizando npm:
```bash
npm install
```

O utilizando yarn:
```bash
yarn install
```

Esto instalará todas las dependencias necesarias listadas en `package.json`:
- `react` y `react-dom`
- `lucide-react` (para iconos)
- `tailwindcss`, `postcss`, `autoprefixer` (para estilos)

#4. Ejecutar el proyecto en modo desarrollo
```bash
npm run dev
```

O con yarn:
```bash
yarn dev
```

La aplicación se abrirá automáticamente en tu navegador en:
```
http://localhost:5173/
```

*(El puerto puede variar si el 5173 está ocupado)*

---

Scripts disponibles

En el directorio del proyecto, podés ejecutar:

`npm run dev`
Ejecuta la app en modo desarrollo.
La página se recargará automáticamente al hacer cambios.

`npm run build`
Compila la aplicación para producción en la carpeta `dist/`.
Optimiza el build para el mejor rendimiento.

`npm run preview`
Previsualiza el build de producción localmente antes de deployar.

`npm run lint`
Ejecuta ESLint para verificar errores en el código.

---

Deployment

Opción 1: GitHub Pages (Recomendado)

#1. Instalar gh-pages
```bash
npm install --save-dev gh-pages
```

#2. Agregar scripts en `package.json`
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://github.com/espacioreal/cotizador-bahia-tranquila/"
}
```

#3. Configurar `vite.config.js`
```javascript
export default {
  base: '/cotizador-bahia-tranquila/',
}
```

#4. Deployar
```bash
npm run deploy
```

Opción 2: Vercel
```bash
npm install -g vercel
vercel
```

Opción 3: Netlify

1. Conectar el repositorio en [Netlify](https://www.netlify.com/)
2. Configurar:
   - Build command: `npm run build`
   - Publish directory: `dist`

---

Lógica de cálculo

Factores de riesgo por ubicación

El cotizador aplica diferentes factores de riesgo según la ubicación en Bahía Blanca:

| Ubicación | Factor | Recargo | Justificación |
|-----------|--------|---------|---------------|
| Centro | 1.0x | 0% | Zona protegida, infraestructura consolidada |
| Zona Norte | 1.15x | +15% | Mayor exposición a vientos del norte |
| Zona Sur | 1.20x | +20% | Zona costera con vulnerabilidad climática |
| Otros Barrios | 1.08x | +8% | Riesgo estándar para la región |

Coberturas adicionales

- Cobertura por Viento: 12% adicional sobre la cotización base
- Cobertura Tormentas/Granizo: 8% adicional sobre la cotización base

Fórmula de cálculo
```javascript
Precio Base = Precio por m² × Superficie
Cotización Base = Precio Base × Factor de Ubicación
Cobertura Viento = Cotización Base × 0.12
Cobertura Tormenta = Cotización Base × 0.08
TOTAL = Cotización Base + Cobertura Viento + Cobertura Tormenta
```

---

Personalización

Modificar precios base

Editar `src/helpers/cotizador.js`:
```javascript
preciosBase: {
  casa: 150,          // Cambiar estos valores
  departamento: 120,
  comercio: 200,
  oficina: 180
}
```

Ajustar factores de riesgo

Editar `src/helpers/cotizador.js`:
```javascript
factoresUbicacion: {
  centro: { factor: 1.0, descripcion: '...', info: '...' },
  // Modificar los factores según necesidad
}
```

Cambiar colores del tema

Editar `tailwind.config.js` para personalizar la paleta de colores:
```javascript
theme: {
  extend: {
    colors: {
      // Agregar colores personalizados
    }
  }
}
```

---

Validaciones implementadas

- Nombre: Mínimo 3 caracteres
- Superficie: Mayor a 0 m² y menor a 10,000 m²
- Feedback visual: Campos con borde rojo en caso de error
- Mensajes descriptivos: Explicación clara de cada error

---

Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/NuevaFuncionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/NuevaFuncionalidad`)
5. Abrir un Pull Request

---

Licencia

Este proyecto fue desarrollado como parte del Proyecto Final de la Carrera Front End de Argentina Programa.

---

Agradecimientos

- UNTREF - Universidad Nacional de Tres de Febrero
- Comunidad de React - Por la documentación y recursos

---

Reportar bugs

Si encontrás algún bug o tenés alguna sugerencia, por favor abrí un [issue](https://github.com/espacioreal/cotizador-bahia-tranquila/issues) en el repositorio.

---

 Si este proyecto te fue útil, considerá darle una estrella en GitHub

---

Desarrollado con ❤️ en Bahía Blanca, Buenos Aires 🇦🇷
