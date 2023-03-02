import {
    navigateToMainPage,
    timeTakenToLoad
  } from "../utils/movieUtils";
  
  describe('API test', () => {
    before(() => {
      navigateToMainPage();
  
    });
    it('Verify the autocomplete results are shown in 300 ms', () => {
      cy.log('***Verify the results are shown in 300ms***');
      timeTakenToLoad();
    });
  });