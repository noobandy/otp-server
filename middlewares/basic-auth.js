var basicAuth = require("basic-auth"),
	path = require("path"),
	User = require(path.join(__dirname, "../models/User"));

var unAuthorized = function(res) {
	return res.send(401);
};

var basicAuthMiddleWare = function(req, res, next) {
	var user = basicAuth(req);
	if(!user || !user.name || !user.pass) {
		return unAuthorized(res);
	}

	//

	User.findByUsername(user.name, function(err, dbUser) {
		if(err) return next(err);

		if(dbUser === null) {
			return unAuthorized(res);
		}
		dbUser.checkPassword(user.pass, function(err, matched) {
			if(err) return next(err);

			if(!matched) {
				return unAuthorized(res);
			}

			req.authenticatedUser = dbUser;

			return next();

		});
	});
};

module.exports = basicAuthMiddleWare;