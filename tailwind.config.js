/** @type {import('tailwindcss').Config} */
// Palette remaps Tailwind's default scales to the portal's own identity, drawn
// from West African materials rather than any organisation's brand: indigo ink
// (purple), indigo blue (blue), morning haze (gray), hibiscus (orange), millet
// gold (yellow/amber), baobab green (green). Existing utility classes pick
// these up without markup changes.
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Indigo ink: side menu, headings, primary buttons
        purple: { 50:"#F2F4FA", 100:"#E4E8F3", 200:"#C6CEE4", 300:"#9AA6CB", 400:"#6B7AAB", 500:"#45558A", 600:"#2A3766", 700:"#1C2541", 800:"#151C33", 900:"#0F1424" },
        // Indigo blue: links and secondary accents
        blue:   { 50:"#EFF3FB", 100:"#DFE7F6", 200:"#BFCFEC", 300:"#94AEDC", 400:"#6587C6", 500:"#4366AF", 600:"#34508A", 700:"#2B4373", 800:"#22365C", 900:"#1A2945" },
        indigo: { 700:"#161D35", 800:"#10162A" },
        // Morning haze: cool neutrals for page, lines and text
        gray:   { 50:"#F4F5F9", 100:"#EBEDF3", 200:"#DCDFEA", 300:"#C3C8D6", 400:"#9CA2B6", 500:"#646A80", 600:"#5B6178", 700:"#434860", 800:"#2C3045", 900:"#1A1D2C" },
        // Hibiscus: the one bold colour, for where you are and what is next
        orange: { 50:"#FCEFF3", 100:"#F8DCE6", 200:"#F0B8CB", 300:"#E58AA8", 400:"#D45985", 500:"#C23668", 600:"#B4235A", 700:"#941C4A", 800:"#741639", 900:"#551029" },
        // Millet gold: quotes and highlights (400 is decorative only)
        yellow: { 50:"#FBF6EA", 100:"#F6EAC8", 200:"#EED89A", 300:"#E3BF63", 400:"#D6A23A", 500:"#BC8A26", 600:"#9E721E", 700:"#8A6418", 800:"#654912", 900:"#4A350D" },
        amber:  { 50:"#FBF6EA", 100:"#F6EAC8", 200:"#EED89A", 300:"#E3BF63", 400:"#D6A23A", 500:"#BC8A26", 600:"#9E721E", 700:"#8A6418", 800:"#654912", 900:"#4A350D" },
        // Baobab green: completed work
        green:  { 50:"#EEF6F2", 100:"#D9EDE3", 200:"#B6DAC8", 300:"#86BFA3", 400:"#559F7D", 500:"#3A8A68", 600:"#2F7A5C", 700:"#25624A", 800:"#1C4B39", 900:"#14362A" },
        red:    { 50:"#FBF0EE", 100:"#F7E1DE", 200:"#EFC7C2", 300:"#E3A199", 400:"#D97C72", 500:"#CE5B4E", 600:"#C2453A", 700:"#A03830", 800:"#7E2C26", 900:"#5C201C" },
        teal:   { 50:"#EDF6F5", 100:"#D8ECEA", 200:"#B7DBD7", 500:"#2E8A80", 600:"#26766D", 700:"#1F6E66", 800:"#185750", 900:"#124440" }
      },
      fontFamily: {
        sans: ['"Public Sans"', "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        serif: ["Newsreader", "Georgia", "Times New Roman", "serif"],
        // Figures use the body face with aligned (tabular) digits; true
        // monospace is kept for copyable templates, where columns line up.
        mono: ['"Public Sans"', "system-ui", "sans-serif"],
        code: ['"IBM Plex Mono"', "SFMono-Regular", "Menlo", "monospace"]
      },
      borderRadius: {
        DEFAULT: "0.1875rem",
        md: "0.25rem",
        lg: "0.3125rem",
        xl: "0.5rem",
        "2xl": "0.625rem"
      }
    },
  },
  plugins: [],
};
