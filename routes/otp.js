var express = require("express"),
	router = express.Router();

router.post("/otp/request", function(req, res, next) {
	var authenticatedProject = req.authenticatedProject;

	authenticatedProject.requestOTP(req.body.mobileNumber, function(err, requestId) {
		if(err) return next(err);

		return res.json({requestId : requestId});
	});

});


router.post("/otp/verify", function(req, res, next) {
	var authenticatedProject = req.authenticatedProject;

	authenticatedProject.verifyOTP(req.body.requestId, req.body.otp, function(err, verified) {
		if(err) return next(err);

		return res.json({success : verified});
	});
});


module.exports = router;