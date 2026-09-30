/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#070709',
          900: '#0C0C10',
          850: '#121217',
          800: '#181820',
          700: '#23232C',
        },
        accent: {
          coral: '#FF4D30',
          lime: '#CCFF00',
          violet: '#8B5CF6',
          cyan: '#00E5FF',
          amber: '#F59E0B',
        },
        workspace: {
          bg: '#070709',
          surface: '#0F0F14',
          surfaceHover: '#171720',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(255, 255, 255, 0.22)',
          textPrimary: '#F4F4F6',
          textSecondary: '#A1A1AA',
          textMuted: '#71717A',
          accentGreen: '#CCFF00',
        },
      },
      fontFamily: {
        display: ['Syne', 'Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tightest: '-0.06em',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
    },
  },
  plugins: [],
}
