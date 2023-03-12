module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': 'off', // Allow console logging in backend code.
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Ignore unused function arguments starting with _
    'no-use-before-define': ['error', { functions: false, classes: true, variables: true }], // Allow variable hoisting for easier-to-read code.
    'prefer-const': 'error', // Encourage use of const where possible.
    semi: ['warn', 'always'], // Require semicolons.
  },
};
