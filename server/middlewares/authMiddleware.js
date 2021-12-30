const checkUser = (req, res, next) => {
	if (req.user) {
		// console.log("req.user");
		next();
	} else {
    console.log("error in auth middleware");
		res.status(403).json("unauthorized");
	}
};

module.exports = checkUser;
