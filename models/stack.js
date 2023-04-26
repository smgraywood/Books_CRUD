const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stackSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
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
