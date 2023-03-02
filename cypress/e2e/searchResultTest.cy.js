import {
    autoCompleteResult,
    clearText,
    navigateToMainPage,
    highlightedBorder,
    movieListCardContent,
    pasteText,
    searchMovie,
    sizeOfTheContent
  } from "../utils/movieUtils";
  
  describe('Movie app test', () => {
    before(() => {
      navigateToMainPage();
  
    });
    it('Search Result test', () => {
      cy.log('***Verified search box is highlighted when clicking on it***');
      highlightedBorder();
      cy.log('***Verified the autocomplete result card content***');
      searchMovie();
      cy.log('***Verified the autocomplete result card size***');
      sizeOfTheContent();
      movieListCardContent();
    });
  });