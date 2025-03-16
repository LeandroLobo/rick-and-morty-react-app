/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}', './app/**/*.{js,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Esquema de colores principal (naranja/verde - Rick and Morty)
        rick: {
          DEFAULT: '#f97316', // Naranja estándar
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // Naranja principal
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        morty: {
          DEFAULT: '#22c55e', // Verde estándar
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e', // Verde principal
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        // Colores para modo oscuro
        dark: {
          background: '#1f2937', // Gris oscuro para fondos
          card: '#374151', // Gris medio para tarjetas
          text: '#f9fafb', // Blanco grisáceo para texto
          accent: '#818cf8', // Indigo para acentos en modo oscuro
        },
        // Colores para estados
        status: {
          alive: '#22c55e', // Verde para personajes vivos
          dead: '#ef4444', // Rojo para personajes muertos
          unknown: '#9ca3af', // Gris para estado desconocido
        },
        gender: {
          male: '#3b82f6', // Azul para masculino
          female: '#ec4899', // Rosa para femenino
          unknown: '#9ca3af', // Gris para desconocido
          genderless: '#a855f7', // Púrpura para sin género
        },
      },
      fontFamily: {
        // Si decides agregar fuentes personalizadas en el futuro
        sans: ['System', 'sans-serif'],
        mono: ['Courier', 'monospace'],
      },
      fontSize: {
        'card-title': ['1.25rem', { lineHeight: '1.5rem', fontWeight: '700' }],
        'card-subtitle': ['1rem', { lineHeight: '1.25rem', fontWeight: '500' }],
      },
      borderRadius: {
        card: '0.75rem',
        avatar: '9999px', // Circular
        button: '0.5rem',
      },
      // Espaciado personalizado
      spacing: {
        'card-gap': '0.75rem',
        'section-gap': '1.25rem',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
