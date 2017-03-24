var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var upload = multer();

var app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

//Require the Router we defined in movies.js
var races = require('./races.js');

app.use('/races', races); 

app.listen(process.env.PORT || 3000);