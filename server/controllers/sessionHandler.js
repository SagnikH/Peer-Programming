const mongoose = require("mongoose");
const Session = require("../models/sessionModel");
const User = require("../models/userModel");
const Document = require("../models/documentModel");
const { NotFoundError } = require("../utils/errors/databaseFacingErrors");
const ObjectId = mongoose.Types.ObjectId;

const createSession = async (req, res) => {
	const { name, userId } = req.body;
	console.log("creating session", { name, userId });
	// documents.documentId = mongoose.Types.ObjectId(documents.documentId);
	// console.log(documents.documentId);

	try {
		//TODO: check userid validity
		const session = await Session.create({ name, userId });

		const userSession = {
			name,
			sessionId: session._id,
			createdAt: session.createdAt,
		};
		console.log("server userSession", userSession);

		const user = await User.findByIdAndUpdate(
			userId,
			{ $addToSet: { userSessions: userSession } },
			{ new: true }
		);

		console.log(user);

		res.status(200).json(session);
	} catch (e) {
		console.log("error in session", e.message);
		res.status(403).json(e.message);
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

		res.status(200).json(sessionInfo);
	} catch (e) {
		//404 -> data not found
		console.log(e);
		res.status(500).json(e);
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

		res.status(200).json(session);
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
		console.log("deleted session", deletedSession);

		//if session doesnot exist it returns null -> so throw a custom error
		if (deletedSession === null)
			return next(new NotFoundError("session not found"));

		const { userId } = deletedSession;

		//find session in user model & update accordingly
		const user = await User.findByIdAndUpdate(
			userId,
			{
				$pull: { userSessions: { sessionId: deletedSession._id } },
			},
			{ new: true }
		);

		//remove the documents once a session is removed
		const deleteDocs = deletedSession.documents;

		deleteDocs.forEach(async (doc) => {
			const _id = doc.documentId;

			const deletedDoc = await Document.findByIdAndDelete(_id);
			console.log("Session handler -> deleted doc", deletedDoc);
		});

		//use this user to update frontend state (maybe)
		res.status(202).json(deletedSession);
	} catch (e) {
		console.log(e);
		res.status(500).json(e);
	}
};

module.exports = { createSession, getSession, updateSession, deleteSession };
