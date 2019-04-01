const express = require('express');
const asyncHandler = require('express-async-handler');
const movieCtrl = require('../controllers/movie.controller');
const config = require('../config/config');

const router = express.Router();
module.exports = router;

router.get('/', asyncHandler(getMovies));
router.get('/:id', asyncHandler(getMovieById));
router.patch('/:id/rate/', asyncHandler(rateMovie));

async function getMovies(req, res) {
  let movies = await movieCtrl.fetch(req);
  res.json({ movies: movies });
}

async function getMovieById(req, res) {
  let movie = await movieCtrl.fetchMovieDetails(req.params.id);
  res.json(movie);
}

async function rateMovie(req, res) {
  let ratedMovie = await movieCtrl.rateMovie(req.params.id, req.body);
  res.json(ratedMovie);
}

