const globals = require('globals')
const pluginJs = require('@eslint/js')
const pluginCypress = require('eslint-plugin-cypress')
const pluginJasmine = require('eslint-plugin-jasmine')
const eslintConfigPrettier = require('eslint-config-prettier')

module.exports = [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.node,
        ...globals.es2021,
        ...globals.jasmine,
        ...globals.mocha,
        Cypress: 'readonly',
        cy: 'readonly',
        XMLHttpRequest: 'readonly',
        document: 'readonly',
        window: 'readonly',
      },
    },
  },
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['**/*.cy.{js,jsx,ts,tsx}', 'cypress/**/*.js'],
    plugins: {
      cypress: pluginCypress,
    },
    rules: {
      ...pluginCypress.configs.recommended.rules,
      'cypress/no-assigning-return-values': 'error',
      'cypress/no-unnecessary-waiting': 'error',
      'cypress/assertion-before-screenshot': 'warn',
      'cypress/no-force': 'warn',
      'cypress/no-async-tests': 'error',
      'cypress/no-pause': 'error',
    },
  },
  {
    plugins: {
      jasmine: pluginJasmine,
    },
    rules: {
      // Add Jasmine specific rules here if needed
    },
  },
  {
    ignores: ['dist/'],
  },
]
