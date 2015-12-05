var express = require('express'),
	router = express.Router(),
	path = require("path"),
	Project = require(path.join(__dirname, "../models/Project"));


router.get('/projects', function(req, res, next) {
	Project.findAllProjectsOfUser(req.authenticatedUser, function(err, projects) {
		if(err) return next(err);

		res.json(projects);
	});
});

router.post('/projects', function(req, res, next) {
	var project = new Project(req.body);
	
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
