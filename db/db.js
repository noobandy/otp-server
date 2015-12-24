var mongoose = require("mongoose");

module.exports = {
    connect: function (dbConfig) {
        var db = mongoose.connect(dbConfig.url, dbConfig.options).connection

        db.on("error", console.error.bind(console, "connection error"))

        //When conection is opened
        db.once("open", function (callback) {

        })

        // When the connection is disconnected
        db.on('disconnected', function () {
            console.log('Mongoose default connection disconnected');
        })


        // If the Node process ends, close the Mongoose connection
        process.on('SIGINT', function () {
            db.close(function () {
                console.log('Mongoose default connection disconnected through app termination');
                process.exit(0);
            })
        })
    }
}