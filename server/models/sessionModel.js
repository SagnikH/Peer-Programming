const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},

		userId: {
			type: mongoose.ObjectId,
			required: true,
		},

		//array of objects
		documents: {
			type: [Schema.Types.Mixed],
			default: [],
		},
	},
	{ timestamps: true, minimize: false }
);

module.exports = mongoose.model("sessiondata", sessionSchema);
