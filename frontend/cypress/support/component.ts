import './commands';
import { mount } from 'cypress/react';

Cypress.Commands.add('mount', mount);

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}