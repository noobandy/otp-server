var mongoose = require("mongoose"),
	path = require("path"),
	DBConfig = function(app) {
		var settings = require(path.join(__dirname, "../props/"+app.get("env")));
		var initialized = false;
		return {
			init : function() {
				if(!initialized) {
					initialized = true;

					var db = mongoose.connect(settings.db.url, settings.db.options).connection;

					db.on("error", console.error.bind(console, "connection error"));

					//When conection is opened
					db.once("open", function(callback) {

					});

					// When the connection is disconnected
					db.on('disconnected', function () {
						console.log('Mongoose default connection disconnected');
					});


					// If the Node process ends, close the Mongoose connection 
					process.on('SIGINT', function() {
						db.close(function () {
							console.log('Mongoose default connection disconnected through app termination');
							process.exit(0);
						});
					});
				}
			}
		};
	};

module.exports = DBConfig;