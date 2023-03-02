const template = document.createElement("template");
template.innerHTML = `
  <style>
    .movie-title {
        flex: 2;
        font-weight: normal;
        letter-spacing: 0.5px;
        margin: 0 5px;
        text-align: center;
    }
  </style>
  <h3 class="movie-title"></h3>
`;

class MovieTitle extends HTMLElement {
  movieTitle;

  constructor(movieTitle) {
    super();

    this.movieTitle = movieTitle;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector("h3").innerText = this.movieTitle;
  }

  static create = (movieTitle) => {
    return new MovieTitle(movieTitle);
  };
}

window.customElements.define("movie-title", MovieTitle);

export default MovieTitle;
