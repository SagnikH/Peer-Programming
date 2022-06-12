const mongoose = require("mongoose");
const Document = require("../models/documentModel");
const Session = require("../models/sessionModel");
const { getNewDoc, serializeDoc } = require("../utils/automergeUtils");
const Leetcode = require("../utils/Leetcode");
const ObjectId = mongoose.Types.ObjectId;

const createDocument = async (req, res) => {
	const { title, type, question, link, sessionId } = req.body;
	const userId = res.locals._id;

	try {
		const session = await Session.findById(sessionId);
		if (!session) {
			res.status(403).json("Session does not exist");
			return;
		}

		// adding initial savedCode for Automerge
		const savedCode = serializeDoc(getNewDoc('//Enter Code Here:'));

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

		await Session.findByIdAndUpdate(
			sessionId,
			{
				$addToSet: { documents: documentObj },
			}
		);

		res.status(200).json(document);
	} catch (e) {
		console.error("Error in createDocument", e);
		res.status(500).json("Error in createDocument");
	}
};

const createLeetcodeDocument = async (req, res, next) => {
	const { link, type, sessionId } = req.body;
	const userId = res.locals._id;

	try {

		const session = await Session.findById(sessionId);
		if (!session) {
			res.status(403).json("Session does not exist");
			return;
		}

		const leetcode = new Leetcode(link);
		const leetcodeRes = await leetcode.fetch();
		if (!leetcodeRes) {
			res.status(404).json("Invalid leetcode link");
			return;
		}

		const title = leetcode.getTitle();
		const question = leetcode.getQuestion();

		const savedCode = serializeDoc(getNewDoc());

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

		await Session.findByIdAndUpdate(
			sessionId,
			{
				$addToSet: { documents: documentObj },
			}
		);

		res.status(200).json(document);
	} catch (e) {
		console.error("Error in createLeetcodeDocument", e);
		res.status(500).json("Error in createLeetcodeDocument");
	}
};

const getDocument = async (req, res, next) => {
	const _id = req.params.id;

	if (!ObjectId.isValid(_id)) {
		res.status(404).json("Invalid document id");
		return;
	}

	try {
		const documentInfo = await Document.findById(_id);

		if (!documentInfo) {
			res.status(404).json("Document not found");
			return;
		}

		res.status(200).json(documentInfo);
	} catch (e) {
		console.error("Error in getDocument", e);
		res.status(500).json("Error in getDocument");
	}
};

const deleteDocument = async (req, res, next) => {
	const _id = req.params.id;

	if (!ObjectId.isValid(_id)) {
		res.status(404).json("Invalid document id");
		return;
	}

	try {
		const deletedDocument = await Document.findByIdAndDelete(_id);

		if (!deletedDocument) {
			res.status(403).json("Document not found");
			return;
		}

		const { sessionId } = deletedDocument;

		await Session.findByIdAndUpdate(
			sessionId,
			{
				$pull: { documents: { documentId: deletedDocument._id } },
			}
		);

		res.status(202).json(deletedDocument);
	} catch (e) {
		console.error("Error in deleteDocument", e);
		res.status(500).json("Error in deleteDocument");
	}
};

module.exports = {
	createDocument,
	getDocument,
	deleteDocument,
	createLeetcodeDocument,
};
