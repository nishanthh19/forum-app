const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

// Register page
router.get('/register', (req, res) => {
  res.render('register');
});

// Register new user
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  User.register(new User({ username, email }), password, (err, user) => {
    if (err) {
      return res.render('register', { error: err.message });
    }
    passport.authenticate('local')(req, res, () => {
      res.redirect('/dashboard');
    });
  });
});

// Login page
router.get('/login', (req, res) => {
  res.render('login');
});

// Login user
router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}));

// Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.send(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
