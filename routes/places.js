var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next) {
  // request({
  //   url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?',
  //   headers: {
  //     key: 'AIzaSyCc1J3rGp4sCagFF3urCWLiFDFiLSE_h-M',
  //     location: '52,5',
  //     radius: '10000',
  //     type: 'cafe'
  //   },
  //   function (error, response, body) {
  //       if (!error && response.statusCode == 200) {
  //           res.json(JSON.parse(body));
  //       }
  //       else {
  //           console.log("Fout bij ophalen Google Waypoints API");
  //       }
  //   }
  // }).pipe(res);

  request('https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyCc1J3rGp4sCagFF3urCWLiFDFiLSE_h-M&location=52%2C5&radius=10000&type=cafe', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json(JSON.parse(body));
        }
        else {
            console.log("Fout bij ophalen Google Waypoints API");
        }
    });
});

router.get('*', function(req, res){
    res.send('Invalid URL');
});

module.exports = router;