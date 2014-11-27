require("es6-shim");

var should = require("should"),
    assert = require("assert"),
    StringType = require("./string");

should.Assertion.add(
    "contains_error",
    function(key) {
        this.params = {
            operator: "contains the error key",
            expected: key
        };
        var errors = this.obj;
        var foundError = errors.find(function(e) {
            return e.key == key;
        });
        if (foundError === undefined) {
            assert.fail();
        }
    },
    false
);

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
                    .and.contains_error("type_mismatch");
            });
        });
        describe("Min Length", function() {
            var type = new StringType()
                .withMinLength(3);
            it("Should accept the string '000'", function() {
                type.validateInput("000").should.be.an.Array
                    .and.be.empty;
            });
            it("Should not accept the string '00'", function() {
                type.validateInput("00").should.be.an.Array
                    .and.not.be.empty
                    .and.contains_error("min_length");
            });
        });
        describe("Max Length", function() {
            var type = new StringType()
                .withMaxLength(3);
            it("Should accept the string '000'", function() {
                type.validateInput("000").should.be.an.Array
                    .and.be.empty;
            });
            it("Should not accept the string '0000'", function() {
                type.validateInput("0000").should.be.an.Array
                    .and.not.be.empty
                    .and.contains_error("max_length");
            });
        });
        describe("Options", function() {
        });
    });
});


