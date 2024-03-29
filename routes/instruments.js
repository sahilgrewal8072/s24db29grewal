var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('instruments', { title: 'Search Results Instruments' });
});

module.exports = router;
