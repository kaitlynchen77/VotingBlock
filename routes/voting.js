var express = require('express');
var router = express.Router();


/* GET voting page. */
router.get('/', function(req, res, next) {
  res.render('voting');
});

// router.post('/', function (req, res, next) {
//   const voting = require('../app.js').voting;

//   const id = req.body.id
//   vote(voting, parseInt(id))
//   res.render('voting');
// });

// async function vote(voting, id) {
//   const web3 = require('../app.js').web3;
//   const MyContract = require('../app.js').MyContract;
//   const votingInstance = await MyContract.deployed();
//   const accounts = await web3.eth.getAccounts();
//   await votingInstance.vote(id, { from: accounts[0] });
// }

module.exports = router;
