/*
class DBManager {
  validateUserId(userId);        // return true if exists or false
  validateSessionId(sessionId);  //  return true if exists or false
  validateDocumentId(docId);     // return true if exists or false
  getUser(userId);                // return user object or null
  getSession(SessionId);          // return session object or null
  getDocument(docId);          // return document object or null
}
*/

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Document = require("../models/documentModel");
const Session = require("../models/sessionModel");
const User = require("../models/userModel");
const { DBSavedCodeManager } = require("./DBSavedCodeManager");

class DBManager {
	constructor() {
		this.dbSavedCodeManager = new DBSavedCodeManager();
	}

	checkValidId(_id) {
		if (!ObjectId.isValid(_id)) return false;

		return true;
	}

	async validateUserId(userId) {
		const checkUserId = this.checkValidId(userId);
		if (!checkUserId) return false;

		try {
			const user = await User.findById(userId);

			if (user) return true;

			return false;
		} catch (e) {
			return false;
		}
	}

	async getUser(userId) {
		const checkUserId = this.checkValidId(userId);
		if (!checkUserId) return null;

		try {
			const user = await User.findById(userId);

			return user;
		} catch (e) {
			return null;
		}
	}

	async validateSessionId(sessionId) {
		const checkSessionId = this.checkValidId(sessionId);
		if (!checkSessionId) return false;

		try {
			const session = await Session.findById(sessionId);

			if (session) return true;

			return false;
		} catch (e) {
			return false;
		}
	}

	async getSession(sessionId) {
		const checkSessionId = this.checkValidId(sessionId);
		if (!checkSessionId) return null;

		try {
			const session = await Session.findById(sessionId);

			return session;
		} catch (e) {
			return null;
		}
	}

	async validateDocumentId(docId) {
		const checkDocId = this.checkValidId(docId);
		if (!checkDocId) return false;

		try {
			const doc = await Document.findById(docId);

			if (doc) return true;

			return false;
		} catch (e) {
			return false;
		}
	}

	async getDocument(docId) {
		const checkDocId = this.checkValidId(docId);
		if (!checkDocId) return null;

		try {
			const doc = await Document.findById(docId);

			return doc;
		} catch (e) {
			return null;
		}
	}
}


module.exports = { DBManager };