var express = require("express"),
	router = express.Router(),
	path = require("path"),
	Otp = require(path.join(__dirname, "../models/Otp")),
	otpGenerator = require(path.join(__dirname, "../models/OtpGenerator")),
	SMSHelper = require(path.join(__dirname, "../models/SMSHelper"));

router.post("/otp/request", function(req, res, next) {
	var authenticatedProject = req.authenticatedProject;

	var otp = new Otp(req.body);

	otp.project = authenticatedProject._id;

	otp.key = otpGenerator(6);

	otp.validTill = new Date().getTime() + 180000;
	
	otp.save(function(err, otp) {
		if(err) return next(err);

		SMSHelper.sendOTP(otp.mobileNumber, otp.key);
		
		return res.json({requestId : otp._id});
	});

});


router.post("/otp/:requestId/verify", function(req, res, next) {
	var otp = Otp.findByRequestId(req.params.requestId, function(err, otp) {
		if(err) return next(err);

		if(otp !== null) {
			otp.verify(req.body.otp, function(err, verified) {
				if(err) return next(err);

				res.json({success : verified});

			});
		} else {
			return next("route");
		}
	});
});


module.exports = router;