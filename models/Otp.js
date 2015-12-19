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
	attemptsLeft : {
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


Otp = mongoose.model("Otp", OtpSchema);


module.exports = Otp;