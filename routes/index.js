var express = require('express');
var router = express.Router();
const { checkNotAuthentication } = require('../config/passport-config');
const db = require('../db/query');

/* GET home page. */
router.get('/', checkNotAuthentication, async (req, res) => {
  return res.render('index', { title: 'Express' });
});

module.exports = router;
