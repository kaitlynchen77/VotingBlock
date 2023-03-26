const express = require('express');
const app = express();
const path = require('path');

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signin.html')); 
});

app.get('/voting', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'voting.html')); 
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
