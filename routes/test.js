var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('test.njk', { var: "Hello World!"});
});

module.exports = router;
