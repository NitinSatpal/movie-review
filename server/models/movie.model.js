const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new mongoose.Schema({
  dvdTitle: {
    type: String,
    required: true
  },
  studio: {
    type: String
  },
  released: {
    type: String,
  },
  status: {
    type: String,
  },
  sound: {
    type: String
  },
  versions: {
    type: String,
  },
  price: {
    type: String,
  },
  rating: {
    type: String,
  },
  year: {
    type: String,
  },
  genre: {
    type: String,
  },
  aspect: {
    type: String,
  },
  upc: {
    type: String,
  },
  dvdReleaseDate: {
    type: String,
  },
  movieId: {
    type: String,
  },
  avgRating: {
    type: Number,
    default: 0
  },
  numOfVotes: {
    type: Number,
    default: 0
  },
  updated: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false
});

MovieSchema.pre('save', function() {
  this.updatedAt= Date.now();
});

module.exports = mongoose.model('Movie', MovieSchema);
