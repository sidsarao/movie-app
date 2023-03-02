import emptyImage from "../assets/emptyImg.png";

class Movie {
  constructor(movie) {
    this.title = movie?.Title;
    this.year = movie?.Year;
    this.id = movie?.imdbID;
    this.type = movie?.Type;
    this.img = movie?.Poster === "N/A" ? emptyImage : movie.Poster;
    this.imdbRating = Math.trunc(movie?.imdbRating);
  }

  static create = (movie) => {
    if (movie) {
      return new Movie(movie);
    }
  };
}

export default Movie;
