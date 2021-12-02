const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const documentSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},

		type: {
			type: String,
			required: true,
		},

		//can be a string (JSON.stringyfy())
		//can be an Object
		question: {
			type: Schema.Types.Mixed,
			default: {},
		},

		link: {
			type: String,
		},

		savedCode: {
			type: String,
			default: "",
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
