var should = require("should"),
    FixedParameter = require("./fixedParameter");

describe("sip2/fixedParameter", function() {
    describe("Simple", function() {
        var param = new FixedParameter("language", 3, "string");
        it("should have a name", function() {
            param.name.should.equal("language");
        });
        it("should have a size", function() {
            param.size.should.equal(3);
        });
        it("should have a type", function() {
            param.type.should.equal("string");
        });
        it("should be impossible to change the name", function() {
            param.name = "changed";
            param.name.should.equal("language");
        });
        it("should be impossible to change the size", function() {
            param.size = "changed";
            param.size.should.equal(3);
        });
        it("should be impossible to change the type", function() {
            param.type = "changed";
            param.type.should.equal("string");
        });
    });
});

