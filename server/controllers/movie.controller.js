const Joi = require('joi');
const Movie = require('../models/movie.model');
const Rating = require('../models/rating.model');
const Comment = require('../models/comment.model');

const movieSchema = Joi.object({
  dvdTitle: Joi.string().required()
})


module.exports = {
  fetch,
  fetchMovieDetails,
  rateMovie
}

async function fetch(req) {
  let movies = await Movie.find({}).select({ "dvdTitle": 1, "movieId": 1, "price": 1, "rating": 1, "genre": 1, "_id":1});
  return movies;
}

async function fetchMovieDetails(id) {
  let movie = await Movie.findOne({'_id': id});  
  return movie;
}

async function rateMovie(id, data) {
  let movie = await Movie.findOne({'_id': id});  
  movie.numOfVotes = movie.numOfVotes + 1;
  movie.avgRating = (movie.avgRating * (movie.numOfVotes - 1) + data.userRating) / movie.numOfVotes;
  let updatedMovie = await movie.save();
  let comment = {
    content: data.userComment,
    user: data.userId,
    movie: updatedMovie._id,
    replyTo: null,
    depth: 0
  }
  let savedComment = await new Comment(comment).save();
  let rating = {
    movie: updatedMovie._id,
    user: data.userId,
    rating: data.userRating
  }
  let savedRating = await new Rating(rating).save();
  return updatedMovie;
}