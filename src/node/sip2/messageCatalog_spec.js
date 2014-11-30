var should = require("should"),
    messageTypes = require("./types"),
    MessageSchema = require("./messageSchema"),
    MessageCatalog = require("./messageCatalog");

describe("sip2/messageCatalog", function() {
    var catalog = new MessageCatalog()
        .withSchema(new MessageSchema("23", "patronStatusRequest")
            .withFixedParameter("language", 3, new messageTypes.String().withLength(3))
            .withFixedParameter("transactionDate", 18, new messageTypes.DateTime())
            .withNamedParameter("institutionId", "AO", new messageTypes.String())
            .withNamedParameter("patronIdentifier", "AA", new messageTypes.String())
            .withNamedParameter("terminalPassword", "AC", new messageTypes.String())
            .withNamedParameter("patronPassword", "AD", new messageTypes.String()))
        .withSchema(new MessageSchema("24", "patronStatusResponse")
            .withFixedParameter("patronStatus", 14, new messageTypes.String().withLength(14))
            .withFixedParameter("language", 3, new messageTypes.String().withLength(3))
            .withFixedParameter("transactionDate", 18, new messageTypes.DateTime())
            .withNamedParameter("institutionId", "AO", new messageTypes.String())
            .withNamedParameter("patronIdentifier", "AA", new messageTypes.String())
            .withNamedParameter("personalName", "AE", new messageTypes.String())
            .withNamedParameter("validPatron", "BL", new messageTypes.String().withEnumeratedOptions(["Y", "N"]))
            .withNamedParameter("validPatronPassword", "CQ", new messageTypes.String().withEnumeratedOptions(["Y", "N"]))
            .withNamedParameter("currencyType", "BH", new messageTypes.String().withLength(3))
            .withNamedParameter("feeAmount", "BV", new messageTypes.String().withLength(3))
            .withNamedParameter("screenMessage", "AF", new messageTypes.String())
            .withNamedParameter("printLine", "AG", new messageTypes.String()));

    describe("Finding Schemas", function() {
        it("Should find a message by name", function() {
            catalog.findMessageSchemaByName("patronStatusRequest").should.exist;
            catalog.findMessageSchemaByName("patronStatusRequest").id.should.equal("23");

        });
        it("Should not find an invalid message by name", function() {
            should.not.exist(catalog.findMessageSchemaByName("invalid"));
        });
        it("Should find a message by ID", function() {
            catalog.findMessageSchemaById("24").should.exist;
            catalog.findMessageSchemaById("24").name.should.equal("patronStatusResponse");
        });
        it("Should not find an invalid message by ID", function() {
            should.not.exist(catalog.findMessageSchemaById("ZZ"));
        });
    });
    describe("New Message", function() {
        it("Should create an empty message", function() {
            var message = catalog.newMessage("patronStatusRequest");
            should.exist(message);
            message.schema.id.should.equal("23");
            should.not.exist(message.language);
        });
        it("Should create a populated message", function() {
            var message = catalog.newMessage("patronStatusRequest", {
                language: "000"
            });
            should.exist(message);
            message.schema.id.should.equal("23");
            message.language.should.equal("000");
        });
        it("Should not create an invalid message", function() {
            should.not.exist(catalog.newMessage("invalid"));
        });
    });
});



