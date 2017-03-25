function init(mongoose){
	console.log('Initializing user schema');

	var userSchema = new mongoose.Schema({
		_id: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
		name: { type: String, required: true },
	},

	{ // settings:
		toObject: { virtuals: true },
		toJSON: { virtuals: true }
	});

	return mongoose.model('User', userSchema);
}

module.exports = init;