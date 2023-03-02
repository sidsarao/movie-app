import {
    navigateToMainPage,
    movieListCardContent,
    pasteText,
  } from "../utils/movieUtils";
  
  describe('Movie app Paste test', () => {
    before(() => {
      navigateToMainPage();
  
    });
    it('Pasting Movie Name test', () => {
      cy.log('***Verify pasting the movie name  in the search bar***');
      pasteText();
      movieListCardContent();
    });
  });