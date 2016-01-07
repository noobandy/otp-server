var mongoose = require("mongoose"),
    ContactRequestSchema,
    ContactRequest;


ContactRequestSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true,
        match: /[0-9]{10}/
    },
    message: {
        type: String,
        required: true
    },
    emailIdVerificationKey: {
        type: String
    },
    mobileNumberVerificationCode: {
        type: Number
    },
    emailIdVerified: {
        type: Boolean,
        default: false
    },
    mobileNumberVerified: {
        type: Boolean,
        default: false
    },
    status: {
        type : String,
        required : true,
        enum : ["new", "pending", "completed"],
        default : "new"
    },
    description : {
        type : String,
        required : true
    },
    remarks: {
        type: String
    }
});
