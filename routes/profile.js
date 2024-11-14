const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Profile page
router.get('/profile', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  const user = await User.findById(req.user._id);
  res.render('profile', { user });
});

// Update profile
router.post('/profile', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  const { name, bio } = req.body;
  await User.findByIdAndUpdate(req.user._id, { 'profile.name': name, 'profile.bio': bio });
  res.redirect('/profile');
});

module.exports = router;
