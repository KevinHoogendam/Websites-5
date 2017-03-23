var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	res.send('GET called on races');
});
router.post('/', function(req, res){
	res.send('POST called on races');
});

router.get('*', function(req, res){
    res.send('Invalid URL');
});

//export this router to use in our index.js
module.exports = router;