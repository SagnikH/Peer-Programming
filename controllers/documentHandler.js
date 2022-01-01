const mongoose = require("mongoose");
const Document = require("../models/documentModel");
const Session = require("../models/sessionModel");
const { getNewDoc, serializeDoc } = require("../utils/automergeUtils");
const { NotFoundError } = require("../utils/errors/databaseFacingErrors");
const ObjectId = mongoose.Types.ObjectId;

const createDocument = async (req, res) => {
	const { title, type, question, link, userId, sessionId } = req.body;
	//TODO: add validity checker
	//TODO: check if question link is valid -> ask fetcher team
	//TODO: check to see if session id exists

	// adding initial savedCode for Automerge
	const savedCode = serializeDoc(getNewDoc());

	try {
		//TODO: check session id exists here if not throw error
		const document = await Document.create({
			title,
			type,
			question,
			link,
			userId,
			sessionId,
			savedCode,
		});

		const documentObj = {
			documentId: document._id,
			title,
			createdAt: document.createdAt,
		};
		//TODO: don't send document as response -> socket stuff ask SUBODH
		const session = await Session.findByIdAndUpdate(
			sessionId,
			{
				$addToSet: { documents: documentObj },
			},
			{ new: true }
		);

		res.status(200).json(document);
	} catch (e) {
		console.log(e.message);
		res.status(403).json(e.message);
	}
};

const getDocument = async (req, res, next) => {
	const _id = req.params.id;
	if (!ObjectId.isValid(_id))
		return next(new NotFoundError("no document with id found"));

	try {
		const documentInfo = await Document.findById(_id);

		if (!documentInfo)
			return next(
				new NotFoundError("no document found with given document id")
			);

		res.status(200).json(documentInfo);
	} catch (e) {
		console.log(e);
		res.status(500).json(e);
	}
};

const updateDocument = async (req, res, next) => {
	const _id = req.params.id;
	if (!ObjectId.isValid(_id))
		return next(new NotFoundError("invalid document id"));

	const { savedCode } = req.body;

	try {
		const document = await Document.findByIdAndUpdate(
			_id,
			{ savedCode },
			{ new: true }
		);

		res.status(200).json(document);
	} catch (e) {
		console.log(e);
		res.status(500).json(e);
	}
};

const deleteDocument = async (req, res, next) => {
	const _id = req.params.id;
	if (!ObjectId.isValid(_id))
		return next(new NotFoundError("invalid document id"));

	try {
		const deletedDocument = await Document.findByIdAndDelete(_id);
		console.log(deletedDocument);
		const { sessionId } = deletedDocument;
		// TODO: delete from the session as well

		const session = await Session.findByIdAndUpdate(
			sessionId,
			{
				$pull: { documents: { documentId: deletedDocument._id } },
			},
			{ new: true, safe: true }
		);

		console.log(session);
		res.status(202).json(deletedDocument);
	} catch (e) {
		console.log(e);
		res.status(500).json(e);
	}
};

module.exports = {
	createDocument,
	getDocument,
	updateDocument,
	deleteDocument,
};
