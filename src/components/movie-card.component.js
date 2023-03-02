import emptyImage from "../assets/emptyImg.png";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    @import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Roboto:wght@100;300;400;500;900&display=swap");
    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }
    body {
      line-height: 1.5;
      font-weight: 300;
      background: #0c0c0c;
    }
    img {
      width: 100%;
      display: block;
    }
    .item {
      width: 480px;
      background: #fff;
      border-radius: 5px;
      overflow: hidden;
      margin-bottom: 2rem;
      -webkit-box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.35);
      -moz-box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.35);
      box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.35);
    }
    .content-container {
      padding: 1rem 1.6rem;
    }
    .content-head {
      display: grid;
      grid-template-columns: auto 30px;
      padding-bottom: 1.2rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }
    .content-head h2 {
      font-size: 1.6rem;
      padding: 0.4rem 0;
    }
    .content-head small {
      font-weight: 500;
      letter-spacing: 1px;
      padding-left: 0.5rem;
      opacity: 0.7;
    }
  </style>
  <div class="movie-card">
    <div class="item">
      <div class="img-container">
        <img src="" alt="">
      </div>
      <div class="content-container">
        <div class="content-head">
          <div>
            <h2></h2>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

class MovieCard extends HTMLElement {
  movie;

  constructor(movie) {
    super();

    this.movie = movie;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector("img").src =
      this.movie.img === "N/A" ? emptyImage : this.movie.img;
    this.shadowRoot.querySelector("h2").innerText = this.movie.title;
  }

  static create = (movie) => {
    return new MovieCard(movie);
  };
}

window.customElements.define("movie-card", MovieCard);

export default MovieCard;
