var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var UserRouter = require('./routes/User');
const fs = require('fs');

var app = express();

var Complete_log = (req, res, next) => {
  try{
    // console.log(ahihi.length);
    var string_log = '-200- ' + JSON.stringify({
      'xu_ly': 'them user moi',
      data_send: req.body
    }) + '\n';
    fs.appendFileSync('./data_log/2020_12_23.log', string_log);
  }
  catch(er){
    var string_log = '-500- Server Internal Error' + '\n';
    fs.appendFileSync('./data_log/2020_12_23.log', string_log);
  }
  next();
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  // console.log(Date.now() + '-' + req.method + '-' + req.url);
  var string_log = Date.now() + '-' + req.method + '-' + req.url + '\n';
  fs.appendFileSync('./data_log/2020_12_23.log', string_log);
  next();
})

app.use(Complete_log);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/User',UserRouter);

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
  res.send('Server Error');
});

module.exports = app;
