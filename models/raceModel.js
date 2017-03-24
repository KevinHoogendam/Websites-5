function init(mongoose){
	console.log('Initializing race schema');

	var raceSchema = new mongoose.Schema({
		_id: { type: String, required: true, unique: true, lowercase: true },
		name: { type: String, required: true },
	},

	{ // settings:
		toObject: { virtuals: true },
		toJSON: { virtuals: true }
	});

	return mongoose.model('Race', raceSchema);
}

module.exports = init;