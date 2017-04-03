function init(mongoose){
	console.log('Initializing race schema');

	var raceSchema = new mongoose.Schema({
		name: { type: String, required: true },
		waypoints: [{googleId: String, name: String}]
	},

//, users: [{ type: String, ref: 'User'}]}

	{ // settings:
		toObject: { virtuals: true },
		toJSON: { virtuals: true }
	});

	return mongoose.model('Race', raceSchema);
}

module.exports = init;