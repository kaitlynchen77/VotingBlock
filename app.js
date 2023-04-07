const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const nunjucks = require('nunjucks');
const Web3 = require('web3');
// const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545"); 

async function getContract(MyContract) {
  const votingInstance = await MyContract.deployed();
  const accounts = await web3.eth.getAccounts();
  await votingInstance.vote(0, { from: accounts[0] });
  return votingInstance
}

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

const indexRouter = require('./routes/index');
const votingRouter = require('./routes/voting');
const initiateRouter = require('./routes/initiate');
const testRouter = require('./routes/test');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.engine('html', require('ejs').renderFile);  DELETE LATER
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));


app.use('/', indexRouter);
app.use('/voting', votingRouter)
app.use('/initiate', initiateRouter)
app.use('/test', testRouter)


// module.exports = app;
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// truffle docs - doesn't work currently
// let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
// // web 3 code
// // Is there an injected web3 instance?
// if (typeof web3 !== 'undefined') {
//   app.web3Provider = web3.currentProvider;
//   web3 = new Web3(web3.currentProvider);
// } else {
//   // If no injected web3 instance is detected, fallback to Ganache.
//   //IMPORTANT: if you are using Ganache GUI instead of CLI, change port in the line below to 7545
//   app.web3Provider = new web3.providers.HttpProvider('http://127.0.0.1:7545');
//   web3 = new Web3(app.web3Provider);
// }

//chat-gpt alternative for above code - works
const web3Provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
const web3 = new Web3(web3Provider);


//below 5 lines from https://github.com/trufflesuite/truffle/tree/master/packages/contract
const contractArtifact = require("./build/contracts/Voting.json"); //produced by Truffle compile
const contract = require("@truffle/contract");
const MyContract = contract(contractArtifact);
MyContract.setProvider(web3Provider);
const voting = getContract(MyContract)
// vote(voting, getAccounts())



// Start the server
// app.listen(3000, () => {
//   console.log('Server started on port 3000');
// });

module.exports = {
  app: app,
  MyContract: MyContract,
  web3: web3
};
