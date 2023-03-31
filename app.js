const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const nunjucks = require('nunjucks');

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

var indexRouter = require('./routes/index');
var votingRouter = require('./routes/voting');
var initiateRouter = require('./routes/initiate');

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
app.use('/initiate', initiateRouter)

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


const Web3 = require('web3');

let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
// web 3 code
// Is there an injected web3 instance?
if (typeof web3 !== 'undefined') {
  app.web3Provider = web3.currentProvider;
  web3 = new Web3(web3.currentProvider);
} else {
  // If no injected web3 instance is detected, fallback to Ganache.
  app.web3Provider = new web3.providers.HttpProvider('http://127.0.0.1:8545');
  web3 = new Web3(app.web3Provider);
}


module.exports = app;
