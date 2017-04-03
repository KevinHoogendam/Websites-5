function init(mongoose){
	console.log('Initializing race schema');

	var raceSchema = new mongoose.Schema({
		_id: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
		name: { type: String, required: true },
		waypoints: [{id: String, name: String, users: [{ type: String, ref: 'User'}]}]
	},

	{ // settings:
		toObject: { virtuals: true },
		toJSON: { virtuals: true }
	});

	return mongoose.model('Race', raceSchema);
}

module.exports = init;

