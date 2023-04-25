const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: String,
		googleId: {
			type: String,
			required: true,
		},
		email: String,
		avatar: String,
		stacks: [{ type: Schema.Types.ObjectId, ref: "Stacks" }],
		books: [{ type: Schema.Types.ObjectId, ref: "Books" }],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
