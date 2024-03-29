module.exports = {
  root: true,
  extends: ['eslint:recommended'],
  plugins: ['svelte3'],
  overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2021,
    ecmaFeatures: {
      jsx: true
    }
  },

  env: {
    browser: true,
    es2017: true,
    node: true
  }
}
