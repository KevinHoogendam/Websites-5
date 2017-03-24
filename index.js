var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var multer = require('multer');
var config = require('./config/config.js');
var upload = multer();

var app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

// Setup mongoose connection
var connectionString;
switch(app.get('env')) {
    case 'test': connectionString = config.db.test;
        break;
    default: connectionString = config.db.dev;
}
mongoose.Promise = require('q').Promise;
mongoose.connect(connectionString);
// /Setup mongoose connection

// Models
    var model = {};
    model.Race = require('./models/raceModel')(mongoose);
    model.User = require('./models/userModel')(mongoose);

    require('./models/fillTestData')(model);
// /Models

//Require the Router we defined in movies.js
var races = require('./races.js');

app.use('/races', races); 

app.listen(process.env.PORT || 3000);