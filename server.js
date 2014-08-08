var express = require('express');
var app = express();
var mongoose = require('mongoose');
var db = require('./config/db');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var morgon = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var port = process.env.PORT || 3000;

mongoose.connect(db.url);

app.use(morgon('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cookieParser());

//for passport
app.use(session({secret : 'iamthebesthacker'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport);
require('./app/routes')(app, passport);

app.listen(port);
console.log('App is listening ' + port);



