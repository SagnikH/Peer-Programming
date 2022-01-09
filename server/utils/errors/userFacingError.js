const { UserFacingError } = require("./baseErrors");

class NotFoundLinkError extends UserFacingError {
	constructor(message) {
		super(message);
	}

	get statusCode() {
		return 404;
	}
}

module.exports = { NotFoundLinkError };
