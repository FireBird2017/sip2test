var should = require("should"),
    NamedParameter = require("./namedParameter");

describe("sip2/namedParameter", function() {
    describe("Simple", function() {
        var param = new NamedParameter("institution", "AO", "string");
        it("should have a name", function() {
            param.name.should.equal("institution");
        });
        it("should have a key", function() {
            param.key.should.equal("AO");
        });
        it("should have a type", function() {
            param.type.should.equal("string");
        });
        it("should be impossible to change the name", function() {
            param.name = "changed";
            param.name.should.equal("institution");
        });
        it("should be impossible to change the key", function() {
            param.key = "changed";
            param.key.should.equal("AO");
        });
        it("should be impossible to change the type", function() {
            param.type = "changed";
            param.type.should.equal("string");
        });
    });
});

