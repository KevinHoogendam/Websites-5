var express = require('express');
var router = express.Router();

var races = [
    {id: 101, name: "Race 1", year: 1999},
    {id: 102, name: "Race 2", year: 2010},
    {id: 103, name: "Race 3", year: 2008},
    {id: 104, name: "Race 4", year: 1957}
];

router.get('/', function(req, res){
	res.json(races);
});

router.get('/:id([0-9]{3,})', function(req, res){
    var currRace = races.filter(function(race){
        if(race.id == req.params.id){
            return true;
        }
    });
    if(currRace.length == 1){
        res.json(currRace[0])
    }
    else{
        res.status(404); //Set status to 404 as race was not found
        res.json({message: "Not Found"});
    }
});

router.post('/', function(req, res){
	//Check if all fields are provided and are valid:
    if(!req.body.name || 
        !req.body.year.toString().match(/^[0-9]{4}$/g)){
        res.status(400);
        res.json({message: "Bad Request"});
    }
    else{
        var newId = races[races.length-1].id+1;
        races.push({
            id: newId,
            name: req.body.name,
            year: req.body.year,
        });
        res.json({message: "New race created.", location: "/races/" + newId});
    }
});

router.put('/:id', function(req, res){
    //Check if all fields are provided and are valid:
 if(!req.body.name || 
        !req.body.year.toString().match(/^[0-9]{4}$/g) || 
        !req.params.id.toString().match(/^[0-9]{3,}$/g)){
        res.status(400);
        res.json({message: "Bad Request"});
    }
    else{
        //Gets us the index of race with given id.
        var updateIndex = races.map(function(race){
            return race.id;
        }).indexOf(parseInt(req.params.id));
        if(updateIndex === -1){
        	res.status(404); //Set status to 404 as race was not found
        	res.json({message: "Not Found"});
        }else{
            //Update existing race
            races[updateIndex] = {
                id: req.params.id,
                name: req.body.name,
                year: req.body.year,
            };
            res.json({message: "Race id " + req.params.id + " updated.", location: "/races/" + req.params.id});
        }
    }
});

router.get('*', function(req, res){
    res.send('Invalid URL');
});

//export this router to use in our index.js
module.exports = router;