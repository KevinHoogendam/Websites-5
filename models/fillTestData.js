var async = require('async');
// Used for getting the environment;
var app = require('express')();
var mongoose = require('mongoose');
function saveCallback(err){
	if(err){
		log('Fill testdata failed, reason: %s', err);
	}
};


function fillTestRaces(Race, done){
	var testData = [
		{ _id:  mongoose.Types.ObjectId(), name: 'raceeee'},
		{ _id:  mongoose.Types.ObjectId(), name: 'zuipen'},
		{ _id:  mongoose.Types.ObjectId(), name: 'geen kinderspel'},
	];

	Race.find({}, function(err, data){
		// Als er nog geen boeken zijn vullen we de testdata
		if(data.length == 0){
			log('Creating race testdata');
			
			testData.forEach(function(race){
				new Race(race).save(saveCallback);
			});
		} else{
			log('Skipping create race testdata, allready present');
		}
	});

	done();
};

// function fillTestUsers(User, done){
// 	var testData = [
// 		{ _id: mongoose.Types.ObjectId(), name: 'Jan'},
// 		{ _id: mongoose.Types.ObjectId(), name: 'Jen'},
// 		{ _id: mongoose.Types.ObjectId(), name: 'Jun'},
// 	];

// 	User.find({}, function(err, data){
// 		// Als er nog geen boeken zijn vullen we de testdata
// 		if(data.length == 0){
// 			log('Creating user testdata');
			
// 			testData.forEach(function(user){
// 				new User(user).save(saveCallback);
// 			});
// 		} else{
// 			log('Skipping create user testdata, allready present');
// 		}
// 	});

// 	done();
// };

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