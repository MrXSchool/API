var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect('mongodb://localhost:27017/apiTest')
  .then(() => console.log('>>>>> Connected successfully'))
  .catch(err => console.log(err));

//goi model
require('./components/categories/model.js')
require('./components/news/model.js')
require('./components/users/model.js')
require('./components/users/modelPR.js')
require('./components/game/users/model.js')
require('./components/train/model.js')






var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var newsRouter = require('./routes/news.js');
var categoriesRouter = require('./routes/categories.js')
var uploadFileRouter = require('./routes/uploadFile.js')
var gameAPI = require('./routes/gameAPI.js')
var productsRouter = require('./routes/products.js')
var train = require('./routes/train.js')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/news', newsRouter);
app.use('/categories', categoriesRouter);
app.use('/uploadFile', uploadFileRouter);
app.use('/gameAPI', gameAPI)
app.use('/products', productsRouter)
app.use('/train', train)



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
