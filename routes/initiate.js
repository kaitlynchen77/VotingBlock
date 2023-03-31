var express = require('express');
var router = express.Router();

/* GET initation page. */
router.get('/', function(req, res, next) {
  res.render('initiate');
});

module.exports = router;
