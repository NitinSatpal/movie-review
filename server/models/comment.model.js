const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema({
  movie: {
    type:Schema.ObjectId,
    ref: 'Movie'
  },
  user: {
    type:Schema.ObjectId,
    ref: 'User'
  },
  depth: {
    type: Number
  },
  replyTo: {
    type:Schema.ObjectId,
    ref: 'Comment'
  },
  content: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('Comment', CommentSchema);
