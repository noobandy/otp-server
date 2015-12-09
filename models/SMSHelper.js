
var host = "http://luna.a2wi.co.in",
	port = "7501",
	apiReqeustTemplate = "/failsafe/HttpLink?aid=@AID@&pin=@PIN@&signature=@SIGNATURE@&mnumber=@MNUMBER@&message=@MESSAGE@@MSG_TYPE@",
	AID = "@AID@",
	PIN = "@PIN@",
	SIGNATURE = "@SIGNATURE@",
	MNUMBER = "@MNUMBER@",
	MESSAGE = "@MESSAGE@",
	MSG_TYPE = "@MSG_TYPE@",
	smsApiConfig = {
		aid : "517170",
		pin : "emp@1",
		signature : "MYSCTY-OTP"
	},
	http = require("http");

module.exports = {
	sendOTP : function(mobileNumber, otp) {

		var apiRequest = apiReqeustTemplate.replace(AID, smsApiConfig.aid);
		apiRequest = apiRequest.replace(PIN, smsApiConfig.pin);
		apiRequest = apiRequest.replace(SIGNATURE, smsApiConfig.signature);
		apiRequest = apiRequest.replace(MESSAGE, otp);
		apiRequest = apiRequest.replace(MNUMBER, mobileNumber);

        if (false) {
            apiRequest = apiRequest.replace(MSG_TYPE, "&msgType=UC");
        }
        else {
            apiRequest = apiRequest.replace(MSG_TYPE, "");
        }

        console.log(host + ":" + port + apiRequest);

        http.request({
        	host : host,
        	port : port,
        	path : apiRequest
        }, function(response) {
        	var str = '';
        	//another chunk of data has been recieved, so append it to `str`
        	response.on('data', function (chunk) {
        		str += chunk;
        	});

        	//the whole response has been recieved, so we just print it out here
        	response.on('end', function () {
        		console.log(str);
        	});
        }).end();
    }
};