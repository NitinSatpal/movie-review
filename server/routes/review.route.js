const express = require('express');
const asyncHandler = require('express-async-handler');
const reviewCtrl = require('../controllers/review.controller');
const config = require('../config/config');

const router = express.Router();
module.exports = router;

router.get('/user/:userId/movie/:movieId', asyncHandler(getUsersRatingForMovie));
router.get('/movie/:movieId/comments', asyncHandler(getMovieComments));

async function getUsersRatingForMovie(req, res) {
  let userRating = await reviewCtrl.getUsersRatingForMovie(req);
  res.json({rating : userRating});
}

async function getMovieComments(req, res) {
  let movieComments = await reviewCtrl.getMovieComments(req);
  res.json({comments : movieComments});
}

