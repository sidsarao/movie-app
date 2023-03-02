import{
    mockTheData,
    navigateToMainPage
  } from "../utils/movieUtils";
  
  describe('Check the mocked data', () => {
    before(() => {
      navigateToMainPage();
  
    });
    it('Verify that on searching the Big-T Explores the Stars movie getting results for Test movie', () => {
      cy.log('***The data for Big-T Explores the Stars movie is being Mocked***');
      mockTheData();
    });
  });