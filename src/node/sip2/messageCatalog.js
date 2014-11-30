require("es6-shim");

var Symbol = require("symbol"),
    Message = require("./message");

var messagesKey = Symbol("messages");

/**
 * Storage for all of the message schemas that are supported
 * @constructor
 */
function MessageCatalog() {
    this[messagesKey] = [];
}

MessageCatalog.prototype = {
    /**
     * Add a new message schema to the catalog
     * @param schema {MessageSchema} the schema to add
     * @return {MessageCatalog} this, for chaining
     */
    withSchema: function(schema) {
        this[messagesKey].push(schema);
        return this;
    },
    /**
     * Find a Message Schema for the given name
     * @param name {String} the name of the message
     * @return the message schema, or undefined if it doesn't exist
     */
    findMessageSchemaByName: function(name) {
        return this[messagesKey].find(function(m) {
            return m.name === name;
        });
    },
    /**
     * Find a Message Schema for the given id
     * @param id {String} the id of the message
     * @return the message schema, or undefined if it doesn't exist
     */
    findMessageSchemaById: function(id) {
        return this[messagesKey].find(function(m) {
            return m.id === id;
        });
    },
    /**
     * Construct a new message for the schema of the given name
     * @param name {String} the name of the schema
     * @param [values] {Object} the values to create in the message
     * @return {Message} the message, or undefined if the schema is not valud
     */
    newMessage: function(name, values) {
        var schema = this.findMessageSchemaByName(name),
            message = undefined;

        if (schema !== undefined) {
            message = new Message(schema, values);
        }

        return message;
    }
};
module.exports = MessageCatalog;
