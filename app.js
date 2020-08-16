var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var homeRouter = require('./routes/home');
var addCatRouter= require('./routes/addCatogery');
var viewCatRouter= require('./routes/ViewCatogery');
var addPswdRouter= require('./routes/addPassword');
var viewPswdRouter= require('./routes/ViewPassword');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));


app.use('/', indexRouter);
app.use('/', homeRouter);
app.use('/',addCatRouter);
app.use('/',addPswdRouter);
app.use('/',viewCatRouter);
app.use('/',viewPswdRouter);

//Start 
app.listen(4000,(err,result)=>{
  if(err) throw err;
  else 
  console.log("App is Running on Port 4000")
})

module.exports = app;
