var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var mongoose = require('mongoose');
var multer = require('multer');
var config = require('./config/config.js');
var upload = multer();
var session = require('express-session');
var exphbs  = require('express-handlebars');
var flash    = require('connect-flash');

function handleError(req, res, statusCode, message){
    console.log();
    console.log('-------- Error handled --------');
    console.log('Request Params: ' + JSON.stringify(req.params));
    console.log('Request Body: ' + JSON.stringify(req.body));
    console.log('Response sent: Statuscode ' + statusCode + ', Message "' + message + '"');
    console.log('-------- /Error handled --------');
    res.status(statusCode);
    res.json(message);
};

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

// Passport
    var passport = require('./auth/passport')(model.User);
// /Passport

// Role based security
    var roles = require('./auth/connectroles')();
// /Role based security

// view engine setup
    app.set('views', path.join(__dirname, 'views/'));
    app.engine('handlebars', exphbs({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');

// required for passport
    app.use(session({ secret: 'myappsecretisthisstring' })); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session
// /required for passport

//Require Routes
var login = require('./routes/login.js')(passport, roles);
var races = require('./routes/races.js')(roles);
var places = require('./routes/places.js');

app.use('/', login);
app.use('/races', races); 
app.use('/places', places); 
// /Require Routes



app.listen(process.env.PORT || 3000);