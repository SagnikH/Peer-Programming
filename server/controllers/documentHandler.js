const mongoose = require("mongoose");
const Document = require("../models/documentModel");
const Session = require("../models/sessionModel");
const { NotFoundError } = require("../utils/errors/databaseFacingErrors");
const ObjectId = mongoose.Types.ObjectId;

const createDocument = async (req, res, next) => {
	const { title, type, question, link, userId, sessionId } = req.body;
	//TODO: add validity checker
	//TODO: check if link is valid -> ask fetcher team

	try {
		//TODO: check session id exists here if not throw error
		const document = await Document.create({
			title,
			type,
			question,
			link,
			userId,
			sessionId,
		});

		const documentObj = { documentId: document._id, title };
		//TODO: don't send document as response -> socket stuff ask SUBODH
		//TODO: check to see if session id exists
		const session = await Session.findByIdAndUpdate(
			sessionId,
			{
				$addToSet: { documents: documentObj },
			},
			{ new: true }
		);

		res.json(session).status(200);
	} catch (e) {
		console.log(e.message);
		res.status(403).json(e.message);
	}
};

module.exports = { createDocument };
