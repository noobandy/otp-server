var express = require("express"),
	router = express.Router(),
	path = require("path"),
	Otp = require(path.join(__dirname, "../models/Otp"));

router.post("/otp/{apiKey}/request", function(req, res, next) {
	var application = req.authenticatedApplication;

	var otp = new Otp(req.body);

	otp.application = application._id;

	otp.save(function(err, otp) {
		if(err) return next(err);

		return res.json({requestId : otp._id});
	});

});


router.post("/otp/{apiKey}/{requestId}/verify", function(req, res, next) {
	var otp = Otp.findByRequestId(req.params.requestId, function(err, otp) {
		if(err) return next(err);

		if(otp !== null) {
			otp.verify(req.body.otp, function(err, verified) {
				if(err) return next(err);

				res.json({success : verified});

			});
		}
	});
});


module.exports = router;