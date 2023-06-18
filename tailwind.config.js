/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.svelte'],
  plugins: [require("daisyui")],
  purge: {
    enabled: true,
    content: [
    './src/App.svelte'
    ]
  },
  theme: {
    extend: {
    },
    daisyui: {
      themes: [
        'button',
        'slider',
      ],
    },
  },
}