var q = require('q');

var mongoose = require('mongoose');
Book = mongoose.model('Book');
Author = mongoose.model('Author');

function fillTestBooks(callback){
	var testData = [
		// Vul hier je testdata voor boeken in 
		// {}, {}, {}
	];

	Book.find({})
		.then(data => {
			// Als er nog geen boeken zijn vullen we de testdata
			if(data.length == 0){
				console.log('Creating books testdata');
				
				testData.forEach(function(book){
					new Book(book).save();
				});
			} else{
				console.log('Skipping create courses testdata, allready present');
			}

			return;
		});
};

function fillTestAuthors(){
	var testData = [
		// Vul hier je testdata voor authors in 
		// {}, {}, {}
	];

	Author.find({}).then(data => {
		// Als er nog geen author zijn vullen we de testdata
		if(data.length == 0){
			console.log('Creating authors testdata');
			
			testData.forEach(function(author){
				new Author(author).save();
			});
		} else{
			console.log('Skipping create courses testdata, allready present');
		}
	});
};

module.exports = function(){
	q.fcall(fillTestBooks).then(fillTestAuthors);
}