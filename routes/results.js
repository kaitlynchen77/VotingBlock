var express = require('express');
var router = express.Router();


/* GET voting page. */
router.get('/', function(req, res, next) {
  res.render('results.njk');
});

module.exports = router;