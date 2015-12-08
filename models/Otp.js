var mongoose = require("mongoose"),
	OtpSchema,
	Otp;

OtpSchema = mongoose.Schema({
	application : {
		type : mongoose.Schema.ObjectId,
		required : true,
		ref : "Application"
	},
	mobileNumber : {
		type : String,
		required : true,
		match : /[0-9]{10}/
	},
	key : {
		type : String,
		required : true
	},
	//unix timestamp
	validTill : {
		type : Number,
		required : true
	}
});


OtpSchema.statics.findByRequestId = function(requestId, cb) {
	Otp.findById(requestId, function(err, otp) {
		if(err) return cb(err);

		return cb(null, otp);
	});
};

OtpSchema.methods.verify = function(key, cb) {
	var now = new Date().getTime();

	if(this.key === key && this.validTill >= now) {
		this.validTill = now;
		this.save(function(err, doc) {
			if(err) return cb(err);

			return cb(null, true); 
		});
	} else {
		cb(null, false);
	}
};

Otp = mongoose.model("Otp", OtpSchema);


module.exports = Otp;