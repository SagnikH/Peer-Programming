const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		googleID: {
			type: String,
		},

		email: {
			type: String,
			required: true,
			unique: true,
			index: true,
		},

		name: {
			type: String,
			required: true,
		},

		picture: {
			type: String,
		},

		sharedSessionId: {
			type: [mongoose.ObjectId],
			default: [],
		},

		userSessionId: {
			type: [mongoose.ObjectId],
			default: [],
		},
	},
	{ strict: true, minimize: false }
);

module.exports = mongoose.model("passportusers", userSchema);
