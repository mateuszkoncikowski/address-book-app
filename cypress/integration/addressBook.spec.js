import { s } from '../support/commands';
import { setFetchBatchSize, setFetchLimit } from '../../src/actions';

const userItem = 'user-item';
const modal = 'user-modal';
const search = 'user-search';
const infiniteScroll = '[style*="overflow: auto"]';

describe('smoke tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.window().its('store').invoke('dispatch', setFetchBatchSize(50));
    cy.window().its('store').invoke('dispatch', setFetchLimit(100));
    cy.contains('Loading').should('not.be.visible');
  });

  it('should load users', () => {
    cy.get(s(userItem))
      .eq(0)
      .should('contain', 'Alejandro Moya')
      .should('contain', 'alejandro.moya@example.com');
  });

  it('should open modal', () => {
    cy.get(s(search)).type('Luc', { delay: 100 });
    cy.get(s(userItem)).eq(0).click();
    cy.get(s(modal))
      .should('be.visible')
      .should('contain', 'Calle de La Democracia 3088')
      .should('contain', '911-593-211');
    cy.get(s('close-button')).click();
    cy.get(s(modal)).should('not.be.visible');
  });

  it('should search return correct results', () => {
    cy.get(s(search)).type('Luc', { delay: 100 });
    cy.get(s(userItem))
      .should('have.length', 1)
      .eq(0)
      .should('contain', 'Lucas Gimenez');
    cy.get(s(search)).get('input').clear().type('Mar', { delay: 100 });
    cy.get(s(userItem)).should('have.length', 3).eq(0);
    cy.get(s(userItem))
      .should('contain', 'Sergio Marin')
      .eq(1)
      .should('contain', 'Ernesto Marquez');
  });

  it('should search return no results', () => {
    cy.get(s(search)).type('Invalid', { delay: 100 });
    cy.get(s(userItem)).should('have.length', 0);
  });

  it('should change language', () => {
    cy.get(s('settings-link')).click();
    cy.get(s('set-lang-es')).should('have.attr', 'aria-pressed', 'true');
    cy.get(s('set-lang-fr')).click();
    cy.get(s('set-lang-fr')).should('have.attr', 'aria-pressed', 'true');
    cy.get(s('set-lang-es')).should('have.attr', 'aria-pressed', 'true');
    cy.get(s('home-link')).click();

    // Spanish person
    cy.get(s(userItem))
      .eq(0)
      .should('contain', 'Alejandro Moya')
      .should('contain', 'alejandro.moya@example.com');

    // French person
    cy.get(s(userItem))
      .eq(3)
      .should('contain', 'Justin Lucas')
      .should('contain', 'justin.lucas@example.com');
  });

  it.only('should infinite scroll load more results', () => {
    cy.get(infiniteScroll).scrollTo('bottom', { duration: 6000 });
    cy.contains('End of users catalog').should('be.visible');
  });
});
