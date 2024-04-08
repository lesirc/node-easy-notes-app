//Group7 code from https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/

const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    content: String,
    topic: 
    {
    //added topic for additional field in note app
    type: String,
    required: true,
    enum: ['business', 'family', 'entertainment']
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);