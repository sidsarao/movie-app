import MovieImage from "./movie-image.component";
import MovieTitle from "./movie-title.component";
import MovieInfo from "./movie-info.component";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    .movie-list-item {
        background-color: #fff;
        border-radius: 3px;
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 10px;
        margin: 10px 0;
    }
    .movie-list-item:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    }
  </style>
  <li class="movie-list-item"></li>
`;

class MovieListItem extends HTMLElement {
  movie;

  constructor(movie) {
    super();

    this.movie = movie;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector("li").setAttribute("id", this.movie.id);
    this.shadowRoot
      .querySelector("li")
      .appendChild(MovieImage.create(movie.img));
    this.shadowRoot
      .querySelector("li")
      .appendChild(MovieTitle.create(movie.title));
    this.shadowRoot
      .querySelector("li")
      .appendChild(MovieInfo.create(movie.year));
  }

  static create = (movie) => {
    return new MovieListItem(movie);
  };

  handleSelectMovieEvent = () => {
    const selectedMovieEvent = new CustomEvent("movie-selected", {
      detail: { movie: this.movie },
    });
    window.parent.document.dispatchEvent(selectedMovieEvent);
  };

  connectedCallback() {
    this.shadowRoot
      .querySelector(`#${this.movie.id}`)
      ?.addEventListener("click", this.handleSelectMovieEvent);
  }

  disconnectedCallback() {
    this.shadowRoot
      .querySelector(`#${this.movie.id}`)
      ?.removeEventListener("click", this.handleSelectMovieEvent);
  }
}

window.customElements.define("movie-list-item", MovieListItem);

export default MovieListItem;
