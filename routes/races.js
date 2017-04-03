var express = require('express');
var router = express.Router();
var async = require('async');
var handleError;
var request = require('request');
var mongoose = require('mongoose');
RaceModel = mongoose.model('Race');

function getRaces(req, res){
  
    var query = {};
	if(req.params.id){
		query._id = req.params.id;
	} 

	var result = RaceModel.find(query);
	result.sort({ ranking: 1 })

    result.exec(function (err, data) {

        if (err) { return handleError(req, res, 500, err); }

        if (!returnJSON(req)) {
            res.render('races/races', { races: data, allwaypoints: res.allwaypoints });
        }
        else {
            return res.json(data);
        }
    });
}

function addRace(req, res){
    if(req.body.name){
        var id = mongoose.Types.ObjectId();
        var newRace = { _id: id, name: req.body.name, waypoints: [{}]};
        RaceModel.find({}, function(err, data){
			new RaceModel(newRace).save(function(err){
                if(err)console.log(err);
            });
	    });
        
        res.send("New record added with ID: " + id);
    }
    else{
       res.status(400);
       res.json({message: "Bad Request"});
    }
}

function deleteRace(req, res){
    console.log("deleting" + req.params.id);
    if(req.params.id){
        RaceModel.findByIdAndRemove(req.params.id).exec();
        res.send("Deleted record with ID: +" + req.params.id);
    }
    else{
       res.status(400);
       res.json({message: "Bad Request"});
    }
}

function putRace(req, res){
	var raceid = req.params.id;
	var waypointid = req.body.waypoint.googleId;

	var race;
	var query = {};
	query._id = raceid;
	var result = RaceModel.find(query);	
	result
		.then(data => {
			race = data[0];
			for (var i = 0; i < race.waypoints.length; i++){
				if (race.waypoints[i].googleId == waypointid){
					var waypoint = race.waypoints[i];
				}
            }

            if (!waypoint) {
                RaceModel.findByIdAndUpdate(
                    raceid,
                    { $push: { "waypoints": req.body.waypoint } },
                    { upsert: true },
                    function (err, model) {
                        if (err) console.log(err);
                    }
                );
            }
        })
		.fail(err => handleError(req, res, 500, err));
}

function returnJSON(req){
    if (req.get('Accept') == "application/json") return true;
    else return false;
}

function getAllWaypoints(req, res, next) {
    if (!returnJSON(req)) {
        request('https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyCc1J3rGp4sCagFF3urCWLiFDFiLSE_h-M&location=52%2C5&radius=10000&type=cafe', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.allwaypoints = JSON.parse(body).results;
                next();
            }
            else {
                console.log("Fout bij ophalen Google Waypoints API");
                next();
            }
        });
    }
    else {
        next();
    }
}

//Routing

router.route('/')
	.get(getAllWaypoints, getRaces)
	.post(addRace)
    .delete(deleteRace);

router.route('/:id')
	.get(getAllWaypoints, getRaces)
    .delete(deleteRace)
    .put(putRace);

router.get('*', function(req, res){
    res.send('Invalid URL');
});

//export this router to use in our index.js
module.exports = router;
