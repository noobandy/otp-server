var mongoose = require("mongoose"),
	OtpSchema,
	Otp;

OtpSchema = mongoose.Schema({
	project : {
		type : mongoose.Schema.ObjectId,
		required : true,
		ref : "Project"
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
	},
	used : {
		type : Boolean,
		default : false
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

	if(this.key === key && !this.used &&this.validTill >= now) {
		this.validTill = now;
		this.used = true;
		this.save(function(err, doc) {
			if(err) return cb(err);

			return cb(null, true); 
		});
	} else {
		return cb(null, false);
	}
};

Otp = mongoose.model("Otp", OtpSchema);


module.exports = Otp;