export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        accent: '#DAE9FF',
        primary: '#0F3175',
        secondary: '#225EEE',
        tertiary: '#0F3073',
        destructive: '#FF5A5A',
        muted: '#F5F5F5',
        popover: '#F5F5F5',
        background: '#EFF6FF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        xl: 'calc(var(--radius) + 4px)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        radius12: '12px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
