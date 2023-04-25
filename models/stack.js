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
		enum: ["Fantasy", "Science Fiction", "Dystopian", "Action & Adventure", "Mystery", "Horror", "Thriller & Suspense", "Historical Fiction", "Romance", "Graphic Novel", "Short Story", "Children", "Memoir & Autobiography", "Biography", "Food & Drink", "Art & Photography", "Self-Help", "History", "Travel", "Religion & Spirituality", "Science & Technology"],
		required: true,
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

const stackSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		books: [bookSchema],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);

module.exports = mongoose.model("Stack", stackSchema);
