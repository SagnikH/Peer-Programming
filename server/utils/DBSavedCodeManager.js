/*
class DBSavedCodemanager {
  has(docId);  // checks if a document with docId exists in DB, returns true or false
  get(docId);  // returns savedCode: String corresponding to docId or null id docId doesnot exists
  set(docId, newCode);  // upadated database with newCode, make sure to validate existance of document with docId
}
*/
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Document = require("../models/documentModel");

class DBSavedCodeManager {
	constructor() {
		console.log("Document collection object");
	}

	//checks if the given docId is a valid ObjectId datatype
	checkValidId(docId) {
		if (!ObjectId.isValid(docId)) return false;

		return true;
	}

	//always assuming docId is a valid one -> check using has()
	async fetch(docId) {
		// const checkValidId = this.checkValidId(docId);
		// if (!checkValidId) return null;
		try {
			const docInfo = await Document.findById(docId);

			return docInfo;
		} catch (e) {
			console.log("Error in fetching document in class", e);

			return null;
		}
	}

	async has(docId) {
		const checkValidId = this.checkValidId(docId);
		if (!checkValidId) return false;

		try {
			const docInfo = await this.fetch(docId);

			if (docInfo) return true;

			return false;
		} catch (e) {
			return false;
		}
	}

	async get(docId) {
		try {
			const checkDocExists = await this.has(docId);
			if (!checkDocExists) return null;

			const document = await this.fetch(docId);

			if (document) return document.savedCode;

			return null;
		} catch (e) {
			console.log("error in getting document", e);

			return null;
		}
	}

	//returns null in case of any error & updated
	async set(docId, newCode) {
		try {
			const checkDocExists = await this.has(docId);
			if (!checkDocExists) return null;

			const document = await Document.findByIdAndUpdate(
				docId,
				{ savedCode: newCode },
				{ new: true }
			);

			return document;
		} catch (e) {
			console.log("error in setting to document");

			return null;
		}
	}
}


module.exports = { DBSavedCodeManager };