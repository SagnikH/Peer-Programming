const mongoose = require("mongoose");
const Session = require("../models/sessionModel");
const User = require("../models/userModel");
const Document = require("../models/documentModel");
const ObjectId = mongoose.Types.ObjectId;

const createSession = async (req, res) => {
	const name = req.body.name;
	const userId = res.locals._id;

	try {
		const session = await Session.create({ name, userId });

		const userSession = {
			name,
			sessionId: session._id,
			createdAt: session.createdAt,
		};

		await User.findByIdAndUpdate(
			userId,
			{ $addToSet: { userSessions: userSession } }
		);

		res.status(200).json(session);
	} catch (e) {
		console.error("Error in createSession", e);
		res.status(500).json("Error in createSession");	
	}
};


const getSession = async (req, res, next) => {
	const _id = req.params.id;

	try {
		const sessionInfo = await Session.findById(_id);

		//in case we dont find a document it sends null
		if (!sessionInfo) {
			res.status(404).json("Session not found");
			return;
		}

		res.status(200).json(sessionInfo);
	} catch (e) {
		console.error("Error in getSession", e);
		res.status(500).json("Error in getSession");
	}
};


const deleteSession = async (req, res, next) => {
	const _id = req.params.id;

	// TODO: These updates should be a single transaction!
	try {
		const deletedSession = await Session.findByIdAndDelete(_id);

		// if session doesnot exist it returns null -> so throw a custom error
		if (deletedSession === null) {
			res.status(404).json("Session to delete not found");
			return;
		}

		const { userId } = deletedSession;

		// find session in user model & update accordingly
		await User.findByIdAndUpdate(
			userId,
			{
				$pull: { userSessions: { sessionId: deletedSession._id } },
			}
		);

		// remove the documents once a session is removed
		const deleteDocs = deletedSession.documents;

		deleteDocs.forEach(async (doc) => {
			const _id = doc.documentId;
			await Document.findByIdAndDelete(_id);
		});

		// use this user to update frontend state (maybe)
		res.status(202).json(deletedSession);
	} catch (e) {
		console.error("Error in deleteSession", e);
		res.status(500).json("Error in deleteSession");	
	}
};



const addSharedSession = async (req, res) => {
	const _id = req.params.id;
	const  userId = res.locals._id;

	if (!ObjectId.isValid(_id)) {
		res.status(404).json("Invalid session id");
		return;
	}

	try {
		const session = await Session.findById(_id);

		if (!session) {
			res.status(404).json("No such session");
			return;
		}

		const sharedSession = {
			name: session.name,
			sessionId: session._id,
			createdAt: session.createdAt,
		};

		// check if the session belongs to the user
		const dbRes = await User.find({
			_id: userId,
			"userSessions.sessionId": session._id,
		});

		if (dbRes.length === 0) {	
			// session not created by user, add to sharedSessions
			await User.findByIdAndUpdate(
				userId,
				{ $addToSet: { sharedSessions: sharedSession } }
			);
			res.status(200).json(session);
			return;
		}
		// session was created by user, no need to add to shared session
		res.status(200).json(null);
	} catch (e) {
		console.error(`Error in addSharedSession ${_id}`, e);
		res.status(500).json("Error in addSharedSession");
	}
};


const deleteSharedSession = async (req, res, next) => {
	const _id = req.params.id;
	const { userId } = req.body;

	if (!ObjectId.isValid(_id)) {
		res.status(404).json("Invalid session id");
		return;
	}

	try {
		const deletedSharedSession = await Session.findById(_id);

		if (!deleteSharedSession) {
			res.status(404).json("No such session");
			return;
		}

		await User.findByIdAndUpdate(
			userId,
			{
				$pull: { sharedSessions: { sessionId: deletedSharedSession._id } },
			}
		);

		res.status(202).json(deletedSharedSession);
	} catch (e) {
		console.error("Error in deleteSharedSession", e);
		res.status(500).json("Error in deleteSharedSession");
	}
};

module.exports = {
	createSession,
	getSession,
	deleteSession,
	addSharedSession,
	deleteSharedSession,
};
