const conn = require("./conn");
const DATABASE = "sample_mflix";
const MOVIES = "movies";
const ObjectId = require("mongodb").ObjectId;

async function getAllMovies(pageSize, page) {
  const connectiondb = await conn.getConnection();
  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({})
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return movies;
}

async function getMovieById(id) {
  const connectiondb = await conn.getConnection();
  const movie = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .findOne({ _id: new ObjectId(id) });

  return movie;
}

async function getWinnerMovies() {
  const connectiondb = await conn.getConnection();
  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ "awards.wins": { $gte: 1 } }) // Buscar películas con al menos 1 premio
    .project({ _id: 0, title: 1, poster: 1, plot: 1 }) // Proyectar solo los campos que necesitas
    .toArray();
  return movies;
}

async function getMoviesByLanguage(pageSize, page, language) {
  const connectiondb = await conn.getConnection();
  const query = language ? { languages: { $in: [language] } } : {}; // Filtrar por idioma si se proporciona
  const options = {
    limit: pageSize,
    skip: pageSize * page,
  };

  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find(query, options) // Aplicar la consulta y opciones de paginación
    .toArray();

  return movies;
}
async function getMoviesByFreshness() {
  const connectiondb = await conn.getConnection();
  const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ "tomatoes.fresh": { $exists: true } }) // Filtrar películas con puntaje "fresh" definido
    .sort({ "tomatoes.fresh": -1 }) // Ordenar de mayor a menor puntaje "fresh"
    .limit(10) // Limita el número de resultados
    .toArray();
  return movies;
}

module.exports = {
  getAllMovies,
  getMovieById,
  getWinnerMovies,
  getMoviesByLanguage,
  getMoviesByFreshness,
};
