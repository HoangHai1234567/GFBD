/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'galindo': ['Galindo', 'cursive'],
        'fredoka': ['Fredoka One', 'cursive'],
        'bubblegum': ['Bubblegum Sans', 'cursive'],
        'chewy': ['Chewy', 'cursive'],
        'lilita': ['Lilita One', 'cursive'],
        'righteous': ['Righteous', 'cursive'],
      },
    },
  },
  plugins: [],
  // Tránh xung đột với Bootstrap bằng cách thêm prefix cho Tailwind
  // prefix: 'tw-', // Bỏ comment dòng này nếu muốn prefix
  corePlugins: {
    // Tắt preflight nếu muốn dùng Bootstrap reset
    // preflight: false,
  }
}
