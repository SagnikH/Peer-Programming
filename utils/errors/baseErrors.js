"use strict";

// Here is the base error classes to extend from

class ApplicationError extends Error {
	//explicity defines it is a getter
	get name() {
		return this.constructor.name;
	}
}

class DatabaseError extends ApplicationError {}

class UserFacingError extends ApplicationError {}

module.exports = {
	ApplicationError,
	DatabaseError,
	UserFacingError,
};
