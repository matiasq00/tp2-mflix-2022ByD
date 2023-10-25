const express = require("express");
const router = express.Router();
const controller = require("../controllers/movies");

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await controller.getAllMovies(pageSize, page));
});

router.get("/byId", async (req, res) => {
  const id = req.query.id ? req.query.id : "";
  res.json(await controller.getMovieById(id));
});

router.get("/winnerMovies", async (req, res) => {
  res.json(await controller.getWinnerMovies());
});

router.get("/byLanguage", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  const language = req.query.language ? req.query.language : "";

  res.json(await controller.getMoviesByLanguage(pageSize, page, language));
});

router.get("/byFreshness", async (req, res) => {
  res.json(await controller.getMoviesByFreshness());
});

module.exports = router;
