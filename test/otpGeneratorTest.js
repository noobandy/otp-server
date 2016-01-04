var assert = require("assert");
var path = require("path");
var otpGenerator = require(path.join(__dirname, "../models/OtpGenerator"));

describe("otpGenerator", function() {
   it("should return a zero digit numeric string for negative length", function() {
       var otp = otpGenerator(-4);
       assert.equal(0, otp.length);
   });

    it("should return a numeric string", function() {
        var otp = otpGenerator(6);
        otp = parseInt(otp);

        assert.equal('number', typeof otp);
    });

    it("should return a 6 digit numeric string", function() {
        var otp = otpGenerator(6);
        assert.equal(6, otp.length);
    });

    it("should return a different 6 digit numeric string at each invocation", function() {
        var otpOne = otpGenerator(6);
        var otpTwo = otpGenerator(6);

        assert.notEqual(otpOne, otpTwo);
    });
});