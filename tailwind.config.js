/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#F9AB01",
        green: "#29B473",
        dark: "#0D1321",
        backdrop: "linear-gradient(180deg, rgba(0,0,0,0), black)",
      },
      fontFamily: {
        logo: ["Delicious Handrawn", "cursive"],
      },
      backgroundImage: {
        "home-bg": "url('/assets/bg.jpeg')",
        "home-2":
          "url('https://pacificsciencecenter.org/wp-content/uploads/2024/04/kingdom-planet-apes-horizontal.jpg')",
        "pattern-bg": "url('/assets/pattern.png')",
        "movies-bg":
          "url('https://image.tmdb.org/t/p/original/i8dshLvq4LE3s0v8PrkDdUyb1ae.jpg')",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1.4rem",
        lg: "3rem",
        xl: "3rem",
        "2xl": "3rem",
      },
    },
  },
  plugins: [],
};
