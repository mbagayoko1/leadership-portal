/** @type {import('tailwindcss').Config} */
// Palette remaps Tailwind's default scales to the portal's "diplomatic dossier"
// system: ink navy (purple), steel blue (blue), warm paper (gray), UNFPA
// orange (orange), brass (yellow/amber), verdigris (green). The app's existing
// utility classes pick these up without markup changes.
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        purple: { 50:"#F4F5F9", 100:"#E7EAF2", 200:"#C7CEDF", 300:"#9AA6C2", 400:"#6E7EA3", 500:"#46577F", 600:"#26324F", 700:"#1E2A44", 800:"#161F33", 900:"#101726" },
        blue:   { 50:"#F0F5F9", 100:"#E2EAF1", 200:"#C4D3E1", 300:"#9BB3C9", 400:"#6C8CAD", 500:"#3E648F", 600:"#2F5077", 700:"#274361", 800:"#1F3750", 900:"#16283B" },
        indigo: { 700:"#1B2438", 800:"#131A2A" },
        gray:   { 50:"#FAF9F7", 100:"#F1EFEA", 200:"#E5E1D8", 300:"#D0CBBF", 400:"#A39D8F", 500:"#7C766A", 600:"#5D5749", 700:"#454037", 800:"#2E2A24", 900:"#1E1B16" },
        orange: { 50:"#FDF3EC", 100:"#FCE8DB", 200:"#F8CFB4", 300:"#F2AC80", 400:"#EC834D", 500:"#E85D1F", 600:"#D14E14", 700:"#AC3F10", 800:"#87310D", 900:"#62240A" },
        yellow: { 50:"#FBF6E9", 100:"#F6ECCF", 200:"#EFDDB0", 300:"#E5C77A", 400:"#D9A62E", 500:"#C08F1F", 600:"#A2761A", 700:"#835E15", 800:"#64470F", 900:"#4A350B" },
        amber:  { 50:"#FBF5E9", 100:"#F5E8CB", 200:"#EAD79F", 300:"#DDBE66", 400:"#CBA23A", 500:"#B98C25", 600:"#A2761D", 700:"#836018", 800:"#654A12", 900:"#4B370E" },
        green:  { 50:"#EEF7F2", 100:"#DCEFE6", 200:"#C2E3D3", 300:"#93CBB2", 400:"#5FAE8D", 500:"#2E8B6E", 600:"#257459", 700:"#1E5F49", 800:"#174A39", 900:"#11382B" },
        red:    { 50:"#FBF0EE", 100:"#F7E1DE", 200:"#EFC7C2", 300:"#E3A199", 400:"#D97C72", 500:"#CE5B4E", 600:"#C2453A", 700:"#A03830", 800:"#7E2C26", 900:"#5C201C" },
        teal:   { 50:"#EDF6F5", 100:"#D8ECEA", 200:"#B7DBD7", 500:"#2E8A80", 600:"#26766D", 700:"#1F6E66", 800:"#185750", 900:"#124440" }
      },
      fontFamily: {
        sans: ['"Public Sans"', "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        serif: ["Newsreader", "Georgia", "Times New Roman", "serif"],
        mono: ['"IBM Plex Mono"', "SFMono-Regular", "Menlo", "monospace"]
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
