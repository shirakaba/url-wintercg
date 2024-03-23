/* eslint-env node */

module.exports = {
  root: true,
  env: {
    es2022: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    sourceType: 'module',
  },
  rules: {},
  globals: {
    URL: 'readable',
    URLSearchParams: 'readable',
  },
};
