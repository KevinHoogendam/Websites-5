var mongoose = require('mongoose');

console.log('Iniializing author schema');

var authorSchema = new mongoose.Schema({

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