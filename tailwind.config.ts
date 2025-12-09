import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // This connects the 'font-serif' class to the Google Font we loaded in _app.tsx
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      // We rely on standard Tailwind colors (Slate/Red), 
      // but you can customize specific shades here if needed.
    },
  },
  plugins: [
    // REQUIRED for the Article Detail page to make the text look good
    typography,
  ],
}
export default config