
var sendVerificationEmail = function(username, key) {
	console.log("http://localhost:3000/#/verifyemail/"+username+"/"+key);
};


var sendPasswordResetEmail = function(username, key) {
	console.log("http://localhost:3000/#/resetpassword/"+username+"/"+key);
};

module.exports = {
	sendVerificationEmail : sendVerificationEmail,
	sendPasswordResetEmail : sendPasswordResetEmail
};