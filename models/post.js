const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  likes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Post', postSchema);
