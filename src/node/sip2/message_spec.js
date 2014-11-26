var should = require("should"),
    Message = require("./message"),
    MessageSchema = require("./messageSchema");

describe("sip2/message", function() {
    var schema = new MessageSchema("23", "patronStatusRequest")
        .withFixedParameter("language", 3, "string")
        .withFixedParameter("transactionDate", 18, "date")
        .withNamedParameter("institutionId", "AO", "string")
        .withNamedParameter("patronIdentifier", "AA", "string")
        .withNamedParameter("terminalPassword", "AC", "string")
        .withNamedParameter("patronPassword", "AD", "string");

    describe("Simple", function() {
        it("can set a property using the function", function() {
            var message = new Message(schema);
            should.not.exist(message.getProperty("institutionId"));
            message.setProperty("institutionId", "91475");
            message.getProperty("institutionId").should.equal("91475");
        });
        it("can set a property using the property", function() {
            var message = new Message(schema);
            should.not.exist(message.getProperty("institutionId"));
            message.institutionId = "91475";
            message.getProperty("institutionId").should.equal("91475");
        });
        it("can get a property using the property", function() {
            var message = new Message(schema);
            should.not.exist(message.institutionId);
            message.institutionId = "91475";
            message.institutionId.should.equal("91475");
        });
        it("can get a property using the property as object", function() {
            var message = new Message(schema);
            should.not.exist(message.institutionId);
            message["institutionId"] = "91475";
            message["institutionId"].should.equal("91475");
        });
    });
    describe("Pre-populated", function() {
        var message = new Message(schema, {
            institutionId: "91475",
            language: "000"
        });
        it("can get a pre-populated value", function() {
            message.institutionId.should.equal("91475");
        });
        it("can change a pre-populated value", function() {
            message.institutionId = "141876";
            message.institutionId.should.equal("141876");
        });
        it("can set a non-populated value", function() {
            should.not.exist(message.patronIdentifier);
            message.patronIdentifier = "coxg";
            message.patronIdentifier.should.equal("coxg");
        });
    });
});



