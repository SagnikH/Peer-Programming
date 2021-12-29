const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const documentSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},

		//custom or leetcode
		type: {
			type: String,
			required: true,
		},

		//can be a string (JSON.stringyfy())
		//can be an Object ->custom or scraped from leetcode
		question: {
			type: String,
			required: true,
		},

		//leetcode link (optional)
		link: {
			type: String,
		},

		savedCode: {
			type: String,
			required: true,
		},

		//handle by using .toString()
		userId: {
			type: mongoose.ObjectId,
			required: true,
		},

		sessionId: {
			type: mongoose.ObjectId,
			required: true,
		},
	},
	{ timestamps: true, minimize: false }
);

module.exports = mongoose.model("document", documentSchema);
