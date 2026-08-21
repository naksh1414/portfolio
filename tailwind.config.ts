import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0E1116",
        board: "#171B21",
        paper: "#ECE7DC",
        fg: "#f4f4f0",
        accent: "#FFA23A",
      },
      fontFamily: {
        display: ["var(--font-mono)"],
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  plugins: [],
}
export default config
