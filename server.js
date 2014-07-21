var express = require('express');
var app = express();
var mongoose = require('mongoose');
var db = require('./config/db');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

mongoose.connect(db.url);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

require('./app/routes')(app);

app.listen(port);
console.log('App is listening ' + port);

