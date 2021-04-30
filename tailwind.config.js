const colors = require(`tailwindcss/colors`)

module.exports = {
  mode: `jit`,
  purge: [`./pages/**/*.tsx`, `./components/**/*.tsx`],
  theme: {
    extend: {
      spacing: {
        '10vh': `10vh`,
        '20vh': `20vh`,
        '30vh': `30vh`,
        '40vh': `40vh`,
        '50vh': `50vh`,
        '60vh': `60vh`,
        '70vh': `70vh`,
        '80vh': `80vh`,
        '85vh': `85vh`,
        '90vh': `90vh`,
        '10vw': `10vw`,
        '20vw': `20vw`,
        '30vw': `30vw`,
        '40vw': `40vw`,
        '50vw': `50vw`,
        '60vw': `60vw`,
        '70vw': `70vw`,
        '80vw': `80vw`,
        '85vw': `85vw`,
        '90vw': `90vw`,
      },
      // colors: https://tailwindcss.com/docs/upgrading-to-v2#configure-your-color-palette-explicitly
      colors: {
        primary: colors.emerald,
      },
    },
  },
  variants: {
    extend: {
      opacity: [`disabled`],
      cursor: [`disabled`],
      backgroundColor: [`disabled`],
    },
  },
  plugins: [require(`@tailwindcss/forms`)],
}
