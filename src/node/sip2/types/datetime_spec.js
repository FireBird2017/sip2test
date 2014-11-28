require("es6-shim");

var should = require("should"),
    moment = require("moment-timezone"),
    DateTimeType = require("./datetime");

require("./should_contains_error");

describe("sip2/types/datetime", function() {
    describe("Formatting", function() {
        var type = new DateTimeType();
        it("Should format a simple date in UTC", function() {
            var time = moment("2014-11-28T16:19:00Z");
            type.format(time).should.be.a.String
                .and.equal("20141128   Z161900");
        });
        it("Should format a simple date in EST", function() {
            var time = moment.tz("2014-11-28T11:19:00", "America/New_York");
            type.format(time).should.be.a.String
                .and.equal("20141128   Z161900");
        });
    });
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


