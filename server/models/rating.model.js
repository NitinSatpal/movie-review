const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new mongoose.Schema({
  movie: {
    type:Schema.ObjectId,
    ref: 'Movie'
  },
  user: {
    type:Schema.ObjectId,
    ref: 'User'
  },
  rating: {
    type: Number,
  },
  comment: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('Rating', RatingSchema);
