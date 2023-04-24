const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    favoriteQuote: [String],
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5
    },
    review: [String],
    stack: [stackSchema]
})

const stackSchema = new Schema({
   name: {
    type: String,
    required : true
   },
   books: [bookSchema]
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);

module.exports = mongoose.model('Stack', stackSchema);