var express = require('express');
var router = express.Router();
var async = require('async');
var handleError;
var request = require('request');
var mongoose = require('mongoose');
var _ = require('underscore');
RaceModel = mongoose.model('Race');

function getRaces(req, res){

    var query = {};
	if(req.params.id){
		query._id = req.params.id;
	} 

    var result = RaceModel.find(query);
    result.sort({ created: -1 });
    console.log(req.query.startindex);

    if(req.query.startindex) result.skip(parseInt(req.query.startindex)-1);
    if(req.query.stopindex) result.limit(parseInt(req.query.stopindex));

    result.exec(function (err, data) {

        if (err) { return handleError(req, res, 500, err); }

        if (!returnJSON(req)) {
            res.render('races/races', { races: data, allwaypoints: res.allwaypoints, user: req.user });
        }
        else {
            return res.json(data);
        }
    });
}

function addRace(req, res){
    if(req.body.name){
        var id = mongoose.Types.ObjectId();
        var newRace = { _id: id, name: req.body.name };
        RaceModel.find({}, function(err, data){
			new RaceModel(newRace).save(function(err, data){
                if(err){
                    console.log(err);
                    res.send({error: err});
                }
                else  res.send(data);
            });
	    });
    }
    else{
       res.status(400);
       res.json({message: "Bad Request"});
    }
}

function deleteRace(req, res){
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

function tagWaypoint(req, res){
    console.log(tagWaypoint);
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

module.exports = function (user){
    
//Routing
    router.route('/')
        .get(user.can('view races'), getAllWaypoints, getRaces)
        .post(user.can('edit races'), addRace)
        .delete(user.can('edit races'), deleteRace);

    router.route('/:id')
        .get(user.can('view races'), getAllWaypoints, getRaces)
        .delete(user.can('edit races'), deleteRace)
        .put(user.can('edit races'), putRace);

    router.route('/:raceid/:waypointid')
        .put(tagWaypoint);

    router.get('*', function(req, res){
        res.send('Invalid URL');
    });

	return router;
};