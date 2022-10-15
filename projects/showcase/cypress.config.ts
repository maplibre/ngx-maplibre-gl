import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    supportFile: 'projects/showcase/cypress/support/e2e.ts',
    specPattern: '**/*.cy.ts',
  },
});
