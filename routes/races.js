var express = require('express');
var router = express.Router();
var async = require('async');
var handleError;

var mongoose = require('mongoose');
RaceModel = mongoose.model('Race');

function getRaces(req, res){
    var query = {};

	if(req.params.id){
		query._id = req.params.id;
	} 

	var result = RaceModel.find(query);

	result
		.then(data => {
			// We hebben gezocht op id, dus we gaan geen array teruggeven.
			if(req.params.id){
				data = data[0];
			}
			return res.json(data);
		})
		.fail();
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