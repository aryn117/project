export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", 
      "synthwave", "retro", "cyberpunk", "valentine", "halloween", 
      "garden", "forest", "aqua", "lofi", "pastel", "fantasy", 
      "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", 
      "business", "acid", "lemonade", "night", "coffee"
    ],
  },
}