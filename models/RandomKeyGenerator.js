var crypto = require("crypto");

var randomKeyGenerator = function(length) {
	//generate and return secure random key of length
	return crypto.randomBytes(length).toString("hex");
};


module.exports = randomKeyGenerator;