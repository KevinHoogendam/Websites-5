var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next) {
  request({
    uri: 'http://www.giantbomb.com/api/search',
    qs: {
      api_key: '123456',
      query: 'World of Warcraft: Legion'
    }
  }).pipe(res);
});

router.get('*', function(req, res){
    res.send('Invalid URL');
});

module.exports = router;