var crypto = require("crypto");

var randomKeyGenerator = function (length) {
    length = length < 0 ? 0 : length;
    var noOfBytes = (length * 4) / 8;
    //generate and return secure random key of length
    return crypto.randomBytes(noOfBytes).toString("hex");
};


module.exports = randomKeyGenerator;