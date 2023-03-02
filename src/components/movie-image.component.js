const template = document.createElement("template");
template.innerHTML = `
  <style>
    .movie-img {
        width: 40px;
    }
  </style>
  <img class="movie-img" alt="" src="">
`;

class MovieImage extends HTMLElement {
  movieImg;

  constructor(movieImg) {
    super();

    this.movieImg = movieImg;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector("img").src = this.movieImg;
  }

  static create = (movieImg) => {
    return new MovieImage(movieImg);
  };
}

window.customElements.define("movie-image", MovieImage);

export default MovieImage;
