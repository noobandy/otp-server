var express = require('express'),
	router = express.Router(),
	path = require("path"),
	Project = require(path.join(__dirname, "../models/Project")),
	slug = require("slug"),
	randomKeyGenerator = require(path.join(__dirname, "../models/RandomKeyGenerator"));

slug.defaults.mode ='rfc3986';

slug.defaults.modes['rfc3986'] = {
    replacement: '-',      // replace spaces with replacement
    symbols: true,         // replace unicode symbols or not
    remove: null,          // (optional) regex to remove characters
    lower: true,           // result in lower case
    charmap: slug.charmap, // replace special characters
    multicharmap: slug.multicharmap // replace multi-characters
};


router.get('/projects', function(req, res, next) {
	Project.findAllProjectsOfUser(req.authenticatedUser, function(err, projects) {
		if(err) return next(err);

		res.json(projects);
	});
});

router.post('/projects', function(req, res, next) {
	var project = new Project(req.body);
	var apiKey = slug(randomKeyGenerator(32));

	project.apiKey = apiKey;
	
	project.user = req.authenticatedUser._id;

	project.save(function(err, project) {
		if(err) return next(err);

		res.json(project);
	});
});


router.get("/projects/:id", function(req, res, next) {
	Project.findById(req.params.id, function(err, project) {
		if(err) return next(err);

		if(project === null) {
			return next("route");
		}
		
		res.json(project);
	});
});

module.exports = router;
