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
	},
	{ strict: true }
);

module.exports = mongoose.model("passportusers", userSchema);
