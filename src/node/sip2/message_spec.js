var should = require("should"),
    Message = require("./message"),
    types = require("./types"),
    MessageSchema = require("./messageSchema");

require("./types/should_contains_error");

describe("sip2/message", function() {
    var schema = new MessageSchema("23", "patronStatusRequest")
        .withFixedParameter("language", 3, new types.String().withLength(3))
        .withFixedParameter("transactionDate", 18, new types.DateTime())
        .withNamedParameter("institutionId", "AO", new types.String())
        .withNamedParameter("patronIdentifier", "AA", new types.String())
        .withNamedParameter("terminalPassword", "AC", new types.String())
        .withNamedParameter("patronPassword", "AD", new types.String());

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
    describe("Validation", function() {
        var message = new Message(schema);
        it("can set a property to a String", function() {
            var validation = message.setProperty("institutionId", "91475");
            validation.should.be.empty;
        });
        it("fails to set a String property to a non-String", function() {
            var validation = message.setProperty("institutionId", 91475);
            validation.should.be.not.empty
                .and.contains_error("type_mismatch");
        });
        it("fails to set an unknown property", function() {
            var validation = message.setProperty("nonExistant", 91475);
            validation.should.be.not.empty
                .and.contains_error("unknown_field");
        });
        it("can set multiple valid properties", function() {
            var validation = message.setProperties({
                institutionId: "91475",
                language: "000"
            });
            validation.should.be.empty;
        });
        it("fails to set multiple invalid properties", function() {
            var validation = message.setProperties({
                institutionId: 91475,
                language: "0"
            });
            validation.should.have.property("institutionId");
            validation.should.have.property("language");

            validation.institutionId.should.not.be.empty
                .and.contains_error("type_mismatch");
            validation.language.should.not.be.empty
                .and.contains_error("min_length");
        });
        it("fails to set one invalid property in some valid ones", function() {
            var validation = message.setProperties({
                institutionId: 91475,
                language: "000"
            });
            validation.should.have.property("institutionId");
            validation.should.not.have.property("language");
            validation.institutionId.should.not.be.empty
                .and.contains_error("type_mismatch");
        });
    });
});



