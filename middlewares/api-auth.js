var path = require("path"),
	Project = require(path.join(__dirname, "../models/Project"));

module.exports = function(req, resp, next) {
	var apiKey = req.query.apiKey;
	Project.findByApiKey(apiKey, function(err, project) {
		if(err) return next(err);
		
		if(project !== null) {
			req.authenticatedProject = project;
			return next("route");
		} else {
			return res.send(401);
		}
		
	});

};