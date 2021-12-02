const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema(
	{
		userId: {
			type: mongoose.ObjectId,
			required: true,
		},

		//array of objects
		documents: [Schema.Types.Mixed],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("sessiondata", sessionSchema);
