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

		sharedSessions: {
			type: [Schema.Types.Mixed],
			default: [],
		},

		userSessions: {
			type: [Schema.Types.Mixed],
			default: [],
		},
	},
	{ strict: true, minimize: false }
);

module.exports = mongoose.model("pair-programming-users", userSchema);
