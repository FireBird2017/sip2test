require("es6-shim");

var should = require("should"),
    StringType = require("./string");

require("./should_contains_error");

describe("sip2/types/string", function() {
    describe("Formatting", function() {
        var type = new StringType();
        it("Should format a simple string", function() {
            type.format("Hello").should.be.a.String
                .and.equal("Hello");
        });
    });
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
        describe("Length Range", function() {
            var type = new StringType()
                .withLength(3, 5);
            it("Should not accept the string '00'", function() {
                type.validateInput("00").should.be.an.Array
                    .and.not.be.empty
                    .and.contains_error("min_length");
            });
            it("Should accept the string '000'", function() {
                type.validateInput("000").should.be.an.Array
                    .and.be.empty;
            });
            it("Should accept the string '0000'", function() {
                type.validateInput("0000").should.be.an.Array
                    .and.be.empty;
            });
            it("Should accept the string '00000'", function() {
                type.validateInput("00000").should.be.an.Array
                    .and.be.empty;
            });
            it("Should not accept the string '000000'", function() {
                type.validateInput("000000").should.be.an.Array
                    .and.not.be.empty
                    .and.contains_error("max_length");
            });
        });
        describe("Fixed Length", function() {
            var type = new StringType()
                .withLength(3);
            it("Should not accept the string '00'", function() {
                type.validateInput("00").should.be.an.Array
                    .and.not.be.empty
                    .and.contains_error("min_length");
            });
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
            var type = new StringType()
                .withEnumeratedOption("000")
                .withEnumeratedOption("001");
            it("Should accept the string '000'", function() {
                type.validateInput("000").should.be.an.Array
                    .and.be.empty;
            });
            it("Should accept the string '001'", function() {
                type.validateInput("001").should.be.an.Array
                    .and.be.empty;
            });
            it("Should not accept the string '002'", function() {
                type.validateInput("002").should.be.an.Array
                    .and.not.be.empty
                    .and.contains_error("enumerated_option");
            });

        });
    });
});


