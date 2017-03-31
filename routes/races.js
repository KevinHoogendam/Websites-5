var express = require('express');
var router = express.Router();
var async = require('async');
var handleError;
var request = require('request');
var mongoose = require('mongoose');
RaceModel = mongoose.model('Race');



function getAllWaypoints(req, res, next) {
    if (req.query.contentType == "html") {
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

function getRaces(req, res){

    var query = {};
	if(req.params.id){
		query._id = req.params.id;
	} 

	var result = RaceModel.find(query);
	result.sort({ ranking: 1 })

	result.exec(function(err, data){

		if(err){ return handleError(req, res, 500, err); }

       if(req.query.contentType == "html"){
         res.render('races/races', { races: data , allwaypoints: res.allwaypoints});
       }
       else{
           return res.json(data);
       }
	});
}

function addRace(req, res){
    if(req.body.name){
        var id = mongoose.Types.ObjectId();
        var newRace = { _id: id, name: req.body.name};
        RaceModel.find({}, function(err, data){
			new RaceModel(newRace).save();
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
    if(req.params.id && req.body.name){
        var query = { '_id': req.params.id };
        req.newData = {};
        req.newData.name = req.body.name;
        RaceModel.findOneAndUpdate(query, req.newData, function(err, doc){
            if (err) return res.send(500, { error: err });
            return res.send("Changed record with ID: +" + req.params.id);
        });
        
    }
    else {
        res.status(400);
        res.json({message: "Bad Request"});
    }
}

//Routing
router.use(getAllWaypoints);

router.route('/')
	.get(getRaces)
	.post(addRace)
    .delete(deleteRace);

router.route('/:id')
	.get(getRaces)
    .delete(deleteRace)
    .put(putRace);

router.get('*', function(req, res){
    res.send('Invalid URL');
});

//export this router to use in our index.js
module.exports = router;
