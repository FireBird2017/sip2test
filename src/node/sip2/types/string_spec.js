require("es6-shim");

var should = require("should"),
    StringType = require("./string");

describe("sip2/types/string", function() {
    describe("Validation", function() {
        describe("No restrictions", function() {
            var type = new StringType();
            it("Should accept the string '000'", function() {
                type.validateInput("000").should.be.an.Array
                    .and.be.empty;
            });
            it("Should not accept the number 5", function() {
                type.validateInput(5).should.be.an.Array
                    .and.not.be.empty
                    .and.match(function(errors) {
                        return errors.find(function(e) {
                            return e.key == "type_mismatch";
                        }) != undefined;
                    });
            });
        });
        describe("Min Length", function() {
        });
        describe("Max Length", function() {
        });
        describe("Options", function() {
        });
    });
});


