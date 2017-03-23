var express = require('express');
var app = express();

var races = require('./races.js'); 

app.get('/', function(req, res){
    res.send("Welcome to our API");
});

app.use('/races', races); 

app.listen(process.env.PORT || 3000);