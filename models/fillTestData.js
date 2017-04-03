var async = require('async');
// Used for getting the environment;
var app = require('express')();
var mongoose = require('mongoose');
function saveCallback(err){
	if(err){
		log('Fill testdata failed, reason: ' + err);
	}
};


function fillTestRaces(Race, done){
	var testData = [
		{ _id:  mongoose.Types.ObjectId(), name: 'raceeee', waypoints: [{googleId: '110ea987dfe7e26956c1fc27f163abb18168bed3', name: 'Starbucks De Meern'}]},
		{ _id:  mongoose.Types.ObjectId(), name: 'zuipen', waypoints: [{googleId: '80f43809517d9dc47d9e20d2cd6f5c52ef749d5f', name: 'Hotel De Gouden Leeuw'}]},
		{ _id:  mongoose.Types.ObjectId(), name: 'geen kinderspel', waypoints: [{googleId: '9d9917b44e35cdd81ac66b9ee897b5308b9a2a5e', name: 'BP'}]},
	];

	Race.find({}, function(err, data){
		// Als er nog geen boeken zijn vullen we de testdata
		if(data.length == 0){
			log('Creating race testdata');
			
			testData.forEach(function(race){
				new Race(race).save(saveCallback);
			});
		} else{
			log('Skipping create race testdata, already present');
		}
	});

	done();
};

function log(message){
	if(app.get('env') == 'development'){
		console.log(message);
	}
};

module.exports = function(model){
	async.waterfall([
		function(done){ fillTestRaces(model.Race, done); }
		// function(done){ fillTestUsers(model.User, done); }
	]);
}