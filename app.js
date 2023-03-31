const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const nunjucks = require('nunjucks');
const Web3 = require('web3');

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

let web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");

//Integrating with metamask (From truffle docs)
if (typeof web3 !== 'undefined') {
  app.web3Provider = web3.currentProvider;
  web3 = new Web3(web3.currentProvider);
} else {
  // If no injected web3 instance is detected, fallback to Ganache.
  app.web3Provider = new web3.providers.HttpProvider('http://127.0.0.1:7545');
  web3 = new Web3(App.web3Provider);
}

const indexRouter = require('./routes/index');
const votingRouter = require('./routes/voting');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));


app.use('/', indexRouter);
app.use('/voting', votingRouter)

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

module.exports = app;