const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  profile: {
    name: String,
    bio: String,
  },
  likedPosts: [mongoose.Schema.Types.ObjectId] // Array of post IDs
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
