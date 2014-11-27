require("es6-shim");

var should = require("should"),
    moment = require("moment-timezone"),
    DateTimeType = require("./datetime");

require("./should_contains_error");

describe("sip2/types/datetime", function() {
    describe("Validation", function() {
        var type = new DateTimeType();
        it("Should accept the current Moment", function() {
            type.validateInput(moment()).should.be.an.Array
                .and.be.empty;
        });
        it("Should not accept the current Date", function() {
            type.validateInput(new Date()).should.be.an.Array
                .and.not.be.empty
                .and.contains_error("type_mismatch");
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
});


