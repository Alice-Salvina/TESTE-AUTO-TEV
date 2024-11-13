// cypress.config.js
const { defineConfig } = require('cypress');
const path = require('path');

module.exports = defineConfig({
  projectId: '9s4uhz',
  e2e: {
    viewportWidth: 1600, // Largura da janela
    viewportHeight: 1500, // Altura da janela
    video:false,
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.cy.js',
    // Configuração do Webpack
    webpackConfig: {
      resolve: {
        alias: {
          // Certifique-se de que o caminho para `faker` está correto
          'faker': path.resolve(__dirname, 'node_modules/faker'),

        

        },
      },
    },
  },
});