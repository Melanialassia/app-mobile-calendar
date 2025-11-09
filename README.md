# 📌 Nombre del Proyecto

DailyTasks - Gestor de actividades diarias


## 📝 Descripción

DailyTasks es una aplicación móvil que permite gestionar actividades diarias. Se pueden crear, editar y eliminar tareas, organizarlas por fecha y clasificarlas según nivel de urgencia.  
La aplicación está desarrollada en **React Native + Expo** utilizando **componentes funcionales con TypeScript**, navegación, formularios con validaciones y manejo de estado global.


## 🚀 Instalación y Ejecución

git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
npm install
npx expo start

Escanear el QR con Expo Go.

🧭 Características Principales

✅ Navegación mediante Stack Navigation

📋 Listado dinámico con FlatList

✏️ Alta, edición y eliminación de tareas (CRUD completo)

🧮 Validaciones en formularios con feedback visual (Toasts)

🔥 Filtrado por nivel de urgencia (Bajo / Medio / Alto)

💾 Persistencia local con AsyncStorage (opcional, mejora agregada)

🧠 Estado global administrado con Zustand

📅 Selección de fecha con react-native-calendars


## 🧱 Dependencias Principales

Zustand ===> Manejo de estado global simple y escalable
date-fns-tz ===> Manejo y formateo de fechas por zona horaria
react-native-calendars ===> Renderización del calendario para seleccionar días
@react-navigation/native + stack Navegación entre pantallas
AsyncStorage ===> Persistencia local
react-native-safe-area-context ===> Asegura que la UI no quede oculta detrás de la barra de estado en iOS/Android.

Instalación:
npm install zustand date-fns-tz @react-native-async-storage/async-storage react-native-calendars


## 📂 Estructura de Carpetas

src/
├─ app/                          # Sistema de rutas (Expo Router)
│  ├─ (tabs)/                    # Layout principal con Tabs
│  │  └─ _layout.tsx             # Layout de navegación
│  │  └─ index.tsx               # Pantalla Home
│  ├─ add-activity.tsx           # Pantalla para crear / editar actividades
│  └─ activity.tsx               # Pantalla de detalle de actividad
│
├─ components/
│  ├─ atoms/                     # Elementos UI básicos 
│  ├─ molecules/                 # Componentes compuestos 
│  └─ organisms/                 # Bloques completos de interfaz 
│
├─ store/                        # Manejo de estado global (Zustand)
│
├─ utils/                        # Funciones auxiliares (formateo de fechas, validaciones, etc.)
│
├─ constants/                    # Constantes generales (filtros, colores, etc.)
│
└─ types/                        # Tipos globales de TypeScript


## 🤖 Uso de IA

Se utilizó inteligencia artificial (ChatGPT y/o GitHub Copilot) únicamente como asistencia durante el desarrollo, para resolver dudas específicas y ayudar en la solución de bugs encontrados en el proceso. Todas las decisiones técnicas, la estructura del proyecto y la implementación final del código fueron realizadas y comprendidas.
