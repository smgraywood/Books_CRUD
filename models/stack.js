const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Scheme for the stack model
const stackSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		//books are saved as an array of book IDs
		books: [
			{
				type: Schema.Types.ObjectId,
				ref: "Book",
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Stack", stackSchema);
