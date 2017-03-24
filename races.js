var express = require('express');
var router = express.Router();

var races = [
    {id: 101, name: "Race 1", year: 1999, rating: 8.1},
    {id: 102, name: "Race 2", year: 2010, rating: 8.7},
    {id: 103, name: "Race 3", year: 2008, rating: 9},
    {id: 104, name: "Race 4", year: 1957, rating: 8.9}
];

router.get('/', function(req, res){
	res.json(races);
});

router.get('/:id', function(req, res){
	res.send('The id you specified is ' + req.params.id);
});

router.post('/', function(req, res){
	res.send('POST called on races');
});

router.get('*', function(req, res){
    res.send('Invalid URL');
});

//export this router to use in our index.js
module.exports = router;