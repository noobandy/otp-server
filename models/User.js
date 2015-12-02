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
		match : /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,
		select : true
	},
	emailId : {
		type : String,
		required : true
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

var User = mongoose.model("User", UserSchema);

module.exports = User;