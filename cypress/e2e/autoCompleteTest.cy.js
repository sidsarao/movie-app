import {
    autoCompleteResult,
    navigateToMainPage,
    movieListCardContent,
  } from "../utils/movieUtils";
  
  describe('AutoComplete test', () => {
    before(() => {
      navigateToMainPage();
    });
    it('Card Content loaded', () => {
      cy.log('***Verify autocomplete result card content***')
      autoCompleteResult();
      movieListCardContent();
    });
  });