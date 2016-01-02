var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        match: /[a-zA-Z0-9_]{6,}/,
        validate: [{
            validator: function (value, respond) {
                if (this.isNew) {
                    User.findByUsername(value, function (err, user) {
                        if (err) return respond(false);

                        if (user !== null) {
                            return respond(false);
                        } else {
                            return respond(true);
                        }
                    });
                } else {
                    return respond(true);
                }


            },
            msg: "{PATH} {VALUE} not available"
        }]
    },
    password: {
        type: String,
        required: true,
        match: /.{8,}/,
        select: true
    },
    emailId: {
        type: String,
        required: true
    },
    emailIdVerificationKey: {
        type: String,
        required: true
    },
    emailIdVerified: {
        type: Boolean
    },
    passwordResetKey: {
        type: String
    }
});

UserSchema.statics.findByUsername = function (username, cb) {
    this.findOne({"username": username}).select("-password -emailIdVerificationKey -passwordResetKey").exec(function (err, user) {

        if (err) return cb(err);

        return cb(null, user);
    });
};

UserSchema.methods.checkPassword = function (password, cb) {
    User.findOne({"username": this.username}).exec(function (err, user) {
        if (err) return cb(err);
        return cb(null, user.password === password);
    });
};

UserSchema.methods.changePassword = function (oldPassword, newPassword, cb) {

    var that = this;
    this.checkPassword(oldPassword, function (err, matched) {
        if (err) return cb(err);

        if (matched) {
            that.password = newPassword;

            that.save(function (err, user) {

                if (err) return cb(err);

                return cb(null, true);

            });
        } else {
            return cb(null, false);
        }
    });
};

UserSchema.methods.resetPassword = function (passwordResetKey, newPassword, cb) {
    User.findOne({"username": this.username}).exec(function (err, user) {
        if (err) return cb(err);

        if (user.passwordResetKey && user.passwordResetKey === passwordResetKey) {
            user.password = newPassword;
            user.passwordResetKey = null;
            user.save(function (err, user) {
                if (err) return cb(err);

                return cb(null, true);
            });
        } else {
            return cb(null, false);
        }
    });
};

UserSchema.methods.verifyEmailId = function (emailIdVerificationKey, cb) {
    User.findOne({"username": this.username}).exec(function (err, user) {
        if (err) return cb(err);

        if (!user.emailIdVerified && user.emailIdVerificationKey === emailIdVerificationKey) {
            user.emailIdVerified = true;
            user.save(function (err, user) {
                if (err) return cb(err);
                return cb(null, true);
            });
        } else {
            return cb(null, false);
        }
    });

};

UserSchema.methods.isAccountEnabled = function() {
  return this.emailIdVerified;
};

var User = mongoose.model("User", UserSchema);

module.exports = User;