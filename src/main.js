// // Please do not share or post this api key anywhere,
// // Your JavaScript will go here, you can view api information at
// // http://www.omdbapi.com/, but the short of it is you'll need to
// // send an "s" param with your query, an "apiKey" which is provided above
// // and a "type" param. The api also accepts "page" as a parameter, and
// // accepts standard numbers as arguments (i.e. page=1)

import MovieListItem from "./components/movie-list-item.component";
import MovieService from "./services/movie.service";
import MovieCard from "./components/movie-card.component";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    input {
        font-family: "Roboto", sans-serif;
        border-radius: 3px;
        border: 1px solid #ddd;
        padding: 15px;
        width: 480px;
    }
    .movies {
        padding: 0;
        list-style-type: none;
        width: 480px;
    }
  </style>
  <input type="text" id="search" placeholder="Search for a Movie" />
  <div id="results">
    <ul class="movies">
    </ul>
  </div>
  <div id="movie-card">
  </div>
`;

class Movies extends HTMLElement {
  searchTerm;
  movies;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  showMovies = async () => {
    this.shadowRoot.querySelector("ul").innerHTML = "";
    this.movies = await MovieService.findMoviesByTitle(this.searchTerm);
    this.movies?.forEach((movie) => {
      const li = MovieListItem.create(movie);
      this.shadowRoot.querySelector("ul").appendChild(li);
    });
  };

  handleMovieSelectedEvent = async (e) => {
    const { movie } = e.detail;
    this.shadowRoot.querySelector("ul").innerHTML = "";
    const movieFound = await MovieService.findMovieById(movie.id);
    this.shadowRoot
      .querySelector("#movie-card")
      .appendChild(MovieCard.create(movieFound));
  };

  connectedCallback() {
    this.shadowRoot
      .querySelector("#search")
      .addEventListener("input", async (e) => {
        this.shadowRoot.querySelector("#movie-card").innerHTML = "";
        this.searchTerm = e.target.value;
        await this.showMovies();
      });

    window.document.addEventListener(
      "movie-selected",
      this.handleMovieSelectedEvent,
      false
    );
  }

  disconnectedCallback() {
    this.shadowRoot
      .querySelector("#search")
      ?.removeEventListener("input", null);
    window.removeEventListener("movie-selected", this.handleMovieSelectedEvent);
  }
}

window.customElements.define("movies-page", Movies);
