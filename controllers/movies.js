const movies = require("../data/movies");

async function getAllMovies(pageSize, page) {
  return movies.getAllMovies(pageSize, page);
}

async function getMovieById(id) {
  console.log(id);
  return movies.getMovieById(id);
}

async function getWinnerMovies() {
  return movies.getWinnerMovies();
}

async function getMoviesByLanguage(pageSize, page, language) {
  return movies.getMoviesByLanguage(pageSize, page, language);
}

async function getMoviesByFreshness() {
  return movies.getMoviesByFreshness();
}

module.exports = {
  getAllMovies,
  getMovieById,
  getWinnerMovies,
  getMoviesByLanguage,
  getMoviesByFreshness,
};
