module.exports = {
  theme: {
    extend: {
      colors: {
        // These will be injected dynamically based on the Hospital ID
        primary: "var(--hospital-primary)", 
        secondary: "var(--hospital-secondary)",
      },
      borderRadius: {
        '3xl': '24px',
      }
    },
  },
}