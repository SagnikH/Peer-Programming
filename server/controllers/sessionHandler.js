const mongoose = require("mongoose");
const Session = require("../models/sessionModel");
const User = require("../models/userModel");
const { NotFoundError } = require("../utils/errors/databaseFacingErrors");
const ObjectId = mongoose.Types.ObjectId;

const createSession = async (req, res) => {
	const { name, userId } = req.body;
	// documents.documentId = mongoose.Types.ObjectId(documents.documentId);
	// console.log(documents.documentId);

	try {
		//TODO: check userid validity
		const session = await Session.create({ name, userId });

		const userSession = { name, sessionId: session._id };

		const user = await User.findByIdAndUpdate(
			userId,
			{ $addToSet: { userSessions: userSession } },
			{ new: true }
		);

		// console.log(user);

		res.json(session).status(200);
	} catch (e) {
		console.log(e.message);
		res.json(e.message).status(403);
	}
};

const getSession = async (req, res, next) => {
	const _id = req.params.id;
	if (!ObjectId.isValid(_id))
		return next(new NotFoundError("invalid session id"));

	try {
		const sessionInfo = await Session.findById(_id);

		//in case we dont find a document it sends null
		if (!sessionInfo)
			return next(new NotFoundError("no session with given session id"));

		res.json(sessionInfo).status(200);
	} catch (e) {
		//404 -> data not found
		console.log(e);
		res.json(e).status(500);
	}
};

const updateSession = async (req, res, next) => {
	const _id = req.params.id;
	if (!ObjectId.isValid(_id))
		return next(new NotFoundError("invalid session id"));

	const { documentId, title } = req.body;
	const document = { documentId, title };
	// console.log(document);
	if (!ObjectId.isValid(documentId))
		return next(new NotFoundError("invalid document id"));

	try {
		const session = await Session.findByIdAndUpdate(
			_id,
			{
				$addToSet: { documents: document },
			},
			{ new: true }
		);

		res.json(session).status(200);
	} catch (e) {
		console.log(e);
		res.status(500).json(e);
	}
};

const deleteSession = async (req, res, next) => {
	const _id = req.params.id;
	if (!ObjectId.isValid(_id))
		return next(new NotFoundError("invalid document id"));

	try {
		const deletedSession = await Session.findByIdAndDelete(_id);

		res.status(202).json("deleted");
	} catch (e) {
		console.log(e);
		res.json(e).status(500);
	}
};

module.exports = { createSession, getSession, updateSession, deleteSession };
