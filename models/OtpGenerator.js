var nums = [0,1,2,3,4,5,6,7,8,9];

var nextIndex = function() {
	return Math.floor(Math.random() * 10);
};

var otpGenerator = function(noOfDigits) {
	var otp = "";
	for(var i = 0; i < noOfDigits; i++) {
		otp = otp + nums[nextIndex()];
	}

	return otp;
};


module.exports = otpGenerator;