import Movie from "../models/movie.model";
import "../utils";
import * as Utils from "../utils";

class MovieService {
  static findMoviesByTitle = async (movieTitle) => {
    let { totalResults } = await Utils.fetchMovieTotalResults(movieTitle);

    if (!totalResults) {
      totalResults = 0;
    }
    const pages = Math.trunc(parseInt(totalResults) / 10) + 1;

    const responses = await Utils.chunks(
      Utils.generateFetchMovieReqPayload(movieTitle, pages),
      Utils.fetchMovies,
      50
    );
    const moviesJson = await Promise.all(
      responses.map(function (response) {
        return response.json();
      })
    );

    const movies = moviesJson.reduce((acc, { Search: movie }) => {
      acc = acc.concat(movie);
      return acc;
    }, []);

    return movies
      .filter((movie) => movie)
      ?.map((movie) => Movie.create(movie))
      .keySort({ year: "desc", title: "desc" });
  };

  static findMovieById = async (movieId) => {
    const movie = await Utils.fetchMovieByImdbId(movieId);
    return Movie.create(movie);
  };
}

export default MovieService;
