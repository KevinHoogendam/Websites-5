var mongoose = require('mongoose');

console.log('Iniializing books schema');

var bookSchema = new mongoose.Schema({

    Title: {type: String, required: true},
    PublishDate: {type: Date, required: true, max: Date.now},
    Category: {type: String, required: true},
    Chapters: [{title: String, numberOfPages: Number}]

});

mongoose.model('Book', bookSchema);
/*
TODO: Create schema, voeg toe aan mongoose
*/

/*
TODO: Validation
- Title: Verplicht, String
- PublishDate: Verplicht, Date, voor vandaag
- Category: Verplicht, String
- Chapters: Array van JSNON { title, numberOfPages }
*/

/*
TODO: 
- De benodigde virtuals (Onder andere totalNumberOfPages, opgebouwd uit numberOfPages van chapters)
- De benodigde extra validation
- De benodigde static methods
- De benodigde instance methods
*/