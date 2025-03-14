const express = require('express');
const router = express.Router();
const passport = require('passport');
const { checkNotAuthentication } = require('../config/passport-config');

router.get('/', checkNotAuthentication, (req, res) => {
  return res.render('login', { greeting: "Welcome Back!" });
})

router.post('/', passport.authenticate('local', {
  successRedirect: '/messages',
  failureRedirect: '/login',
  failureFlash: true
}));

module.exports = router;