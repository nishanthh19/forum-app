const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');

// Dashboard route
router.get('/', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  const posts = await Post.find({});
  res.render('dashboard', { posts });
});

module.exports = router;
