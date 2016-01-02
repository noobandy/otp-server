var mongoose = require("mongoose"),
    ProjectSchema,
    Project,
    path = require("path"),
    Otp = require(path.join(__dirname, "Otp")),
    otpGenerator = require(path.join(__dirname, "../models/OtpGenerator")),
    SMSHelper = require(path.join(__dirname, "../models/SMSHelper"));

ProjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    apiKey: {
        //secret slug(_id)
        type: String,
        required: true
    },
    config: {
        //time to live (validity period for otp in milliseconds)
        otpValidityPeriod: {
            type: Number,
            //default is 3 min (180000 milliseconds)
            default: 180000
        },
        //how many attempts are allowed for otp
        otpMaxAllowedAttempts: {
            type: Number,
            default: 3
        },
        //otp length
        otpLength: {
            type: Number,
            default: 6
        }
    },
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    deletedAt: {
        type: Date
    }
});

ProjectSchema.statics.findAllProjectsOfUser = function (user, cb) {
    Project.find({user: user._id, deletedAt: null}, function (err, projects) {
        if (err) return cb(err);

        return cb(null, projects);
    });
};

ProjectSchema.statics.findByApiKey = function (apiKey, cb) {
    Project.findOne({apiKey: apiKey, deletedAt: null}, function (err, project) {
        if (err) return cb(err);

        return cb(null, project);
    });
};

ProjectSchema.methods.delete = function (cb) {
    this.deletedAt = new Date();
    this.save(function (err, doc) {
        if (err) return cb(err);
        return cb(null, doc);
    });
};

ProjectSchema.methods.requestOTP = function (mobileNumber, cb) {
    var otp = new Otp({mobileNumber: mobileNumber});

    otp.project = this._id;

    otp.key = otpGenerator(this.config.otpLength);

    otp.validTill = new Date().getTime() + this.config.otpValidityPeriod;

    otp.attemptsLeft = this.config.otpMaxAllowedAttempts;

    otp.save(function (err, otp) {
        if (err) return cb(err);

        SMSHelper.sendOTP(otp.mobileNumber, otp.key);

        return cb(null, otp._id);
    });
};

ProjectSchema.methods.verifyOTP = function (requestId, userResponse, cb) {
    Otp.findByRequestId(requestId, function (err, otp) {
        var verified = false;

        if (err) return cb(err);

        if (otp === null) return cb({name: "otp not found", message: "otp not found"});


        if (otp.isValid() && otp.attemptsLeft > 0) {

            otp.attemptsLeft = otp.attemptsLeft - 1;

            if (otp.key === userResponse) {
                otp.usedAt = new Date().getTime();
                verified = true;
            }
        }

        otp.save(function (err, otp) {
            if (err) return cb(err);

            return cb(null, verified);
        });

    });
};


Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;