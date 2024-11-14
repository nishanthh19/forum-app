const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');

// Create a new post
router.post('/create', async (req, res) => {
  const { title, content } = req.body;
  const newPost = new Post({ title, content });
  await newPost.save();
  res.redirect('/dashboard');
});

// Like a post
router.post('/like/:postId', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }

  const postId = req.params.postId;
  const user = await User.findById(req.user._id);
  const post = await Post.findById(postId);

  // Check if the user has already liked this post
  if (user.likedPosts.includes(postId)) {
    return res.status(400).send("You have already liked this post.");
  }

  // Add like to post and user likedPosts
  post.likes += 1;
  user.likedPosts.push(postId);
  await post.save();
  await user.save();

  res.redirect('/dashboard');
});

module.exports = router;
