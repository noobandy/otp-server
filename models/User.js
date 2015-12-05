var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
	username : {
		type : String,
		required : true,
		match : /[a-zA-Z0-9_]{6,}/
	},
	password : {
		type : String,
		required : true,
		match : /.{8,}/,
		select : true
	},
	emailId : {
		type : String,
		required : true
	},
	emailIdVerificationKey : {
		type : String,
		required : true
	},
	emailIdVerified : {
		type : Boolean
	},
	passwordResetKey : {
		type : String
	}
});

UserSchema.statics.findByUsername = function(username, cb) {
	this.find({"username" : username}).select("-password").exec( function(err, docs) {

		if(err) return cb(err);
		
		if(docs.length > 0) {
			return cb(null, docs[0]);
		} else {
			return cb(null, null);
		}
	});
};

UserSchema.methods.checkPassword = function(password, cb) {
	User.find({"username" : this.username}).exec(function(err, user) {
		if(err) return cb(err);

		//console.log(user);

		return cb(null, user.password === password);
	});
};

UserSchema.methods.changePassword = function(oldPassword, newPassword, cb) {
	this.checkPassword(oldPassword, function(err, matched) {
		if(err) return cb(err);

		if(matched) {
			this.password = newPassword;
			this.save(function(err, user) {
			
				if(err) return cb(err);

				return(null, true);
			});
		} else {
			return cb(null, false);
		}
	});
};

UserSchema.methods.resetPassword = function(passwordResetKey, newPassword, cb) {
	if(this.passwordResetKey && this.passwordResetKey === passwordResetKey) {
		this.password = newPassword;
		this.save(function(err, user) {
			if(err) return cb(err);
			return cb(null, true);
		});
	} else {
		return cb(null, false);
	}
};

UserSchema.methods.verifyEmailId = function(emailIdVerificationKey, cb) {
	if(!this.emailIdVerified && this.emailIdVerificationKey === emailIdVerificationKey) {
		this.emailIdVerified = true;
		this.save(function(err, user) {
			if(err) return cb(err);
			return cb(null, true);
		});
	} else {
		return cb(null, false);
	}
};

var User = mongoose.model("User", UserSchema);

module.exports = User;