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
        cosmic: {
          950: '#05070e',
          900: '#0a0d18',
          850: '#0f1424',
          800: '#141b30',
          700: '#1e2947',
          600: '#2d3d66',
        },
        cyan: {
          accent: '#00f2fe',
          glow: '#4facfe',
        },
        violet: {
          accent: '#7928ca',
          glow: '#b827fc',
        },
        magenta: {
          accent: '#ff0080',
          glow: '#ff4b8b',
        },
        emerald: {
          accent: '#00f5a0',
          glow: '#00d9f5',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'SFMono-Regular', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-cyan': 'glowCyan 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glowCyan: {
          '0%': { boxShadow: '0 0 5px rgba(0, 242, 254, 0.2), 0 0 10px rgba(0, 242, 254, 0.1)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 242, 254, 0.6), 0 0 30px rgba(0, 242, 254, 0.3)' },
        }
      }
    },
  },
  plugins: [],
}
