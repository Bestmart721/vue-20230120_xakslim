module.exports = {
  root: true,

  ignorePatterns: ['**/vendor/*.js'],

  env: {
    browser: true,
    es2021: true,
    'vue/setup-compiler-macros': true,
  },

  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier',
    '@vue/eslint-config-typescript/recommended',
  ],

  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2021,
  },

  rules: {
    // Basic
    'no-unused-vars': 'off', // For task start code
    '@typescript-eslint/no-unused-vars': 'off', // For task start code
    '@typescript-eslint/no-empty-function': 'off', // For task start code
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    'no-debugger': 'warn',
    'no-var': 'error',
    // Vue / Priority A: Essential Essential
    'vue/no-unused-components': 'off', // For task start code
    'vue/require-v-for-key': 'warn', // Unknown error in the beginning
    'vue/valid-template-root': 'off', // For task start code
    // Vue / Priority B: Strongly Recommended
    'vue/v-bind-style': 'error',
    'vue/v-on-style': 'error',
    'vue/v-slot-style': 'error',
    'vue/require-explicit-emits': 'warn',
    'vue/mustache-interpolation-spacing': 'warn',
    'vue/no-template-shadow': 'warn',
    // Vue / Priority C: Recommended
    'vue/attributes-order': process.env.TASK_DEV ? 'error' : 'warn',
    'vue/order-in-components': process.env.TASK_DEV ? 'error' : 'warn',
    'vue/new-line-between-multi-line-property': process.env.TASK_DEV ? 'error' : 'off',
    'vue/this-in-template': 'error',
    // Vue / Uncategorized
    'vue/match-component-file-name': process.env.TASK_DEV ? 'error' : 'off',
    'vue/no-duplicate-attr-inheritance': 'error',
    'vue/no-useless-v-bind': process.env.TASK_DEV ? 'error' : 'warn',
    'vue/padding-line-between-blocks': process.env.TASK_DEV ? 'error' : 'warn',
    'vue/v-for-delimiter-style': 'error',
  },

  overrides: [
    {
      files: ['**/__tests__/*.js?(x)'],
      env: {
        jest: true,
        node: true,
      },
    },
    {
      files: ['./*.js', 'utility_modules/*.js'],
      env: {
        node: true,
      },
    },
  ],
};
