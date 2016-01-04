var assert = require("assert");
var path = require("path");
var randomKeyGenerator = require(path.join(__dirname, "../models/RandomKeyGenerator"));

describe("randomKeyGenerator", function() {
   it("should return a string of length 0 for negative length", function() {
       var key = randomKeyGenerator(-4);
       assert.equal(0, key.length);
   });


    it("should return a string of length 6", function() {
        var key = randomKeyGenerator(6);
        assert.equal(6, key.length);
    });

    it("should return a different string for each call", function() {
        var keyOne = randomKeyGenerator(6);
        var keyTwo = randomKeyGenerator(6);

        assert.notEqual(keyOne, keyTwo);
    });

});