const template = document.createElement("template");
template.innerHTML = `
  <style>
    .movie-info {
        border-left: 1px solid #aaa;
        color: #777;
        padding: 0 15px;
        flex: 1;
    }
    .movie-year {
        font-weight: 300;
        line-height: 24px;
        margin: 0 0 12px;
    }
    .movie-year-text {
        font-weight: 300;
        letter-spacing: 1px;
        margin: 0;
        text-transform: uppercase;
    }
  </style>
  <div class="movie-info">
    <h2 class="movie-year"></h2>
    <h5 class="movie-year-text">Year</h5>
  </div>
`;

class MovieInfo extends HTMLElement {
  movieYear;

  constructor(movieYear) {
    super();

    this.movieYear = movieYear;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector("h2").innerText = this.movieYear;
  }

  static create = (movieYear) => {
    return new MovieInfo(movieYear);
  };
}

window.customElements.define("movie-info", MovieInfo);

export default MovieInfo;
