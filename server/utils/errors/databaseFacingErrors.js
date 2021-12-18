const { DatabaseError } = require("./baseErrors");

class NotFoundError extends DatabaseError {
	constructor(message) {
		super(message);
	}

	get statusCode() {
		return 404;
	}
}

module.exports = { NotFoundError };
