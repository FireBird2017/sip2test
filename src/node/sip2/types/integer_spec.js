require("es6-shim");

var should = require("should"),
    IntegerType = require("./integer");

require("./should_contains_error");

describe("sip2/types/integer", function() {
    describe("Formatting", function() {
        var type = new IntegerType();
        it("Should format a simple number", function() {
            type.format(42).should.be.a.String
                .and.equal("42");
        });
    });
    describe("Validation", function() {
        describe("No restrictions", function() {
            var type = new IntegerType();
            it("Should accept the integer 5", function() {
                type.validateInput(5).should.be.an.Array
                    .and.be.empty;
            });
            it("Should not accept the number 5.2", function() {
                type.validateInput(5.2).should.be.an.Array
                    .and.not.be.empty
                    .and.contains_error("type_mismatch");
            });
            it("Should not accept the string '000'", function() {
                type.validateInput("000").should.be.an.Array
                    .and.not.be.empty
                    .and.contains_error("type_mismatch");
            });
        });
        describe("Min Value", function() {
            var type = new IntegerType()
                .withMin(3);
            it("Should accept the integer 3", function() {
                type.validateInput(3).should.be.an.Array
                    .and.be.empty;
            });
            it("Should accept the integer 4", function() {
                type.validateInput(4).should.be.an.Array
                    .and.be.empty;
            });
            it("Should not accept the integer 2", function() {
                type.validateInput(2).should.be.an.Array
                    .and.not.be.empty
                    .and.contains_error("min");
            });
        });
        describe("Max Value", function() {
            var type = new IntegerType()
                .withMax(3);
            it("Should accept the integer 3", function() {
                type.validateInput(3).should.be.an.Array
                    .and.be.empty;
            });
            it("Should accept the integer 2", function() {
                type.validateInput(2).should.be.an.Array
                    .and.be.empty;
            });
            it("Should not accept the integer 4", function() {
                type.validateInput(4).should.be.an.Array
                    .and.not.be.empty
                    .and.contains_error("max");
            });
        });
    });
});


