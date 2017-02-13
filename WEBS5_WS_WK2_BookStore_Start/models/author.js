var mongoose = require('mongoose');

console.log('Iniializing author schema');

var authorSchema = new mongoose.Schema({

    Firstname: {type: String, required: true},
    Lastname: {type: String, required: true},
    Birthdate: {type: Date, required: true, max: Date.now},
    Country: {type: String, default: "NL"},
    Ranking: {type: Number, unique: true, min: 0},
    Books: [{type: mongoose.Schema.Types.ObjectId, ref: "Book"}]

});

mongoose.model('Author', authorSchema);

/*
TODO: Create schema, voeg toe aan mongoose
*/

/*
TODO: Validation
- Firstname: Verplicht, String
- Lastname: Verplicht, String
- Birthdate: Verplicht, Date, voor vandaag
- Country: String, default: NL
- Ranking: Number, unique, boven 0
- Books: Array van book id's
*/

/*
TODO: 
- De benodigde extra validation
- De benodigde static methods
- De benodigde instance methods
*/