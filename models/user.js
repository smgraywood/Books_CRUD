const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema for the user model
//all info is obtained via user's google profile except stacks & books
const userSchema = new Schema(
	{
		name: String,
		googleId: {
			type: String,
			required: true,
		},
		email: String,
		avatar: String,
		//an array of stack IDs of all stacks that are created by the user
		stacks: [{ type: Schema.Types.ObjectId, ref: "Stacks" }],
		//an array of book IDs of all books that are created by the user
		books: [{ type: Schema.Types.ObjectId, ref: "Books" }],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
