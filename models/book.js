const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	genre: {
        type: String,
		enum: ["Fantasy", "Science Fiction", "Dystopian", "Action & Adventure", "Mystery", "Horror", "Thriller & Suspense", "Historical Fiction", "Romance", "Graphic Novel", "Short Story", "Children", "Memoir & Autobiography", "Biography", "Food & Drink", "Art & Photography", "Self-Help", "History", "Travel", "Religion & Spirituality", "Science & Technology"],
	},
	rating: {
		type: Number,
		min: 1,
		max: 5,
		default: 5,
	},
	review: [String],
	favoriteQuote: [String],
});

module.exports = mongoose.model("Book", bookSchema);