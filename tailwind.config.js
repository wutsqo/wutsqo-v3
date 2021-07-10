module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      zIndex: {
        "-10": "-10",
      },
      typography(theme) {
        return {
          quoteless: {
            css: {
              "blockquote p:first-of-type::before": { content: "none" },
              "blockquote p:first-of-type::after": { content: "none" },
            },
          },
          dark: {
            css: {
              color: theme("colors.gray.300"),
              '[class~="lead"]': { color: theme("colors.gray.400") },
              a: { color: theme("colors.gray.200") },
              strong: { color: theme("colors.gray.200") },
              "ul > li::before": { backgroundColor: theme("colors.gray.700") },
              hr: { borderColor: theme("colors.gray.800") },
              blockquote: {
                color: theme("colors.pink.200"),
                borderLeftColor: theme("colors.pink.800"),
              },
              h1: { color: theme("colors.gray.200") },
              h2: { color: theme("colors.gray.200") },
              h3: { color: theme("colors.gray.200") },
              h4: { color: theme("colors.gray.200") },
              code: { color: theme("colors.gray.200") },
              "a code": { color: theme("colors.gray.200") },
              pre: {
                color: theme("colors.gray.300"),
                backgroundColor: theme("colors.gray.800"),
              },
              thead: {
                color: theme("colors.gray.200"),
                borderBottomColor: theme("colors.gray.700"),
              },
              "tbody tr": { borderBottomColor: theme("colors.gray.800") },
            },
          },
        };
      },
    },
  },
  variants: {
    extend: {
      typography: ["dark"],
      zIndex: ["hover"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
