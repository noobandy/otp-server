var mongoose = require("mongoose"),
	ContactRequestSchema,
	ContactRequest;


ContactRequestSchema = mongoose.Schema({
	firstName : {
		type : String,
		required : true,
		match : /^[a-zA-Z]+ *[a-zA-Z]+$/
	},
	lastName : {
		type : String,
		required : true,
		match : /^[a-zA-Z]+ *[a-zA-Z]+$/
	},
	emailId : {
		type : String,
		required : true
	},
	mobileNumber : {
		type : String,
		required : true,
		match : /[0-9]{10}/
	},
	message : {
		type : String,
		required : true
	},
	emailIdVerificationKey : {
		type : String
	},
	mobileNumberVerificationCode : {
		tyep : Number
	},
	emailIdVerified : {
		type : Boolean,
		default : false
	},
	mobileNumberVerified : {
		type : Boolean,
		default : false
	},
	repliedAt : {
		type : Date
	},
	remarks : {
		type : String
	}
});
