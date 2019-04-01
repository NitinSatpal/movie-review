const Rating = require('../models/rating.model');
//const Comment = require('../models/comment.model');
var mongoose = require('mongoose');
var Actor = mongoose.model('Comment');
module.exports = {
  getUsersRatingForMovie,
  getMovieComments
}

async function getUsersRatingForMovie(req) {
  let userId = req.params.userId;
  let movieId = req.params.movieId;
  let rating = await Rating.findOne({
    user: userId,
    movie: movieId
  });
  return rating;
}

async function getMovieComments(req) {
  let movieId = req.params.movieId;
  let comments = await  Actor.aggregate( [
                          
                          {
                            $graphLookup: {
                              from: "comments",
                              startWith: "$_id",
                              connectFromField: "_id",
                              connectToField: "replyTo",
                              depthField: "replyNumber",
                              maxDepth: 0,
                              as: "replies"
                            }
                          },
                          {
                            $unwind: "$replies"
                          },
                          {
                            $sort: { "replies.replyNumber": 1, "createdAt": 1 }
                          },
                          {
                            $group: {
                                _id: "$_id",
                                content: {$first: "$content"},
                                replies: { $push: "$replies" }
                            }
    },
                        ] );
  console.log(comments);
  return comments;
}