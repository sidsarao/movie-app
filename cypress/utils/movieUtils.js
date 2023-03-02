import moviePage from  "../pageObjects/moviePage.json";
const appUrl = Cypress.env("appUrl");
const txtToPaste= "cote";
const {
    eleImage,
    eleMovieInfo,
    movieList,
    movieTitle,
    searchBar,
    searchPlaceholder,
    movieNameHeader
} = moviePage;

const navigateToMainPage = () => {
    cy.visit(appUrl);
};

const pasteText = () => {
    cy.get(searchBar).click({force: true}).invoke('text').then((text) => {
        cy.get(searchBar).click().type( txtToPaste , {force: true});
        cy.wait(3000);
    });
};

const highlightedBorder = () => {
    cy.get(searchBar).click({force: true}).should('have.css', 'border', '1px solid rgb(221, 221, 221)');
};

const autoCompleteResult = () => {
    cy.get(searchBar).click().type('Fad', {force: true});
    cy.get(movieList).should('exist');
    cy.get(movieNameHeader).should('exist');
    cy.get(eleImage).should('exist');
    cy.wait(3000);
};

const movieListCardContent = () => {
    cy.get(movieList).wait(3000).should('exist');
    cy.get(movieNameHeader).should('exist');
    cy.get(eleImage).should('exist')
};

const searchMovie = () => {
    cy.get(searchBar).click().type('test', {force: true}).wait(3000).type('{enter}', {force: true});
    for(let i= 0; i < movieList.length; i++){
        cy.get(movieList).eq(i).find('h3').invoke('text').then((text) => {
        cy.log(`***${text}***`);
    });
    };
};

const sizeOfTheContent = () => {
    cy.get('.movies').should('have.css', 'width', '480px');
    cy.get('html').should('have.css', 'line-height', '18.4px');
};

const openingMovie = () => {
    cy.get('.movie-list-item').first().find('.movie-title').click({force: true}).trigger('movie-selected');
    cy.wait(3000);
    cy.get('[class="img-container"]').should('exist');
    cy.get('.movie-card').find('.content-head').invoke('text').then((text) => {
    cy.log(text);
    });
};

const clearText = () => {
    cy.get(searchBar).clear({force: true});
};

const  mockTheData = () => {
    cy.intercept('GET', '*&type=movie&page*', { fixture: 'mockData.json' }).as('Flow The Movie');
    cy.get(searchBar).clear({force: true});
    cy.get(searchBar).click().type('Big-T Explores the Stars', {force: true}).wait(3000).type('{enter}', {force: true});
    cy.wait('@Flow The Movie').then((interception) => {
        assert.isNotNull(interception.response.delay, 'All API call has the mocked data');
    });
};

const timeTakenToLoad = () => {
    cy.intercept('GET', '*&type=movie&page*').as('Delay Time');
    cy.get(searchBar).click().type('test', {force: true}).wait(3000).type('{enter}', {force: true});
    cy.wait('@Delay Time').then((interception) => {
        assert.isNotNull(interception.response.delay, 'All API call has the mocked data');
    });
};

export{
    autoCompleteResult,
    clearText,
    navigateToMainPage,
    highlightedBorder,
    movieListCardContent,
    openingMovie,
    pasteText,
    searchMovie,
    sizeOfTheContent,
    mockTheData,
    timeTakenToLoad
};