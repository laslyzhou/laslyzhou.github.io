import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginCypress from 'eslint-plugin-cypress'
import pluginJasmine from 'eslint-plugin-jasmine'

export default [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.node,
        ...globals.es2021,
        ...globals.jasmine,
        ...globals.browser,
        Cypress: 'readonly',
        cy: 'readonly',
        before: 'readonly',
        after: 'readonly',
        XMLHttpRequest: 'readonly',
        // "cypress/globals": true  // This might be redundant now
      },
    },
    plugins: {
      jasmine: pluginJasmine,
      cypress: pluginCypress,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      'cypress/no-assigning-return-values': 'error',
      'cypress/no-unnecessary-waiting': 'error',
      'cypress/assertion-before-screenshot': 'warn',
      'cypress/no-force': 'warn',
      'cypress/no-async-tests': 'error',
      'cypress/no-pause': 'error',
      // Note: "prettier" rules are typically handled by running Prettier separately
      // or using a plugin like eslint-config-prettier to disable conflicting rules.
      // For simplicity, I'm not including eslint-config-prettier here,
      // but it might be needed if there are conflicts.
    },
    ignores: [
      'node_modules/',
      'bower_components/',
      'dist/',
      '*.swa',
      '*.swp',
      '*.swo',
      'coverage/',
      '.idea/',
      '.DS_Store',
      'spec/end_to_end_tests/reports/',
      'cypress/',
      '.nyc_output/',
      '.private.notes',
    ],
  },
]
