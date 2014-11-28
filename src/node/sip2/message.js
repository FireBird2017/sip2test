var Symbol = require("symbol"),
    valuesKey = Symbol("values");

/**
 * Constructor for an actual message that is sent or received
 * @constructor
 * @param schema {MessageSchema} The schema of the message
 * @param [values] {Object} The initial values for the message
 */
function Message(schema, values) {
    Object.defineProperties(this, {
        schema: {
            value: schema,
            writable: false,
            enumerable: true
        }
    });

    this[valuesKey] = {};

    var schemaProperties = {};
    schema.parameterNames.forEach(function(p) {
        schemaProperties[p] = {
            enumerable: true,
            get: function() {
                return this.getProperty(p);
            },
            set: function(v) {
                this.setProperty(p, v);
            }
        };
    });
    Object.defineProperties(this, schemaProperties);

    if (values) {
        this.setProperties(values);
    }
}

Message.prototype = {
    /**
     * Get the current value of a property in the message
     * @param p {String} The property name
     * @return {Any} The property value
     */
    getProperty: function(p) {
        return this[valuesKey][p];
    },
    /**
     * Set the value of a property in the message
     * @param p {String} The property name
     * @param v {Any} The property value
     * @return {Array} Collection of validation errors from setting the property. Empty if no errors occurred
     */
    setProperty: function(p, v) {
        var schemaProperty = this.schema.getParameterByName(p),
            errors;
        if (schemaProperty) {
            errors = schemaProperty.type.validateInput(v);
        } else {
            errors = [{
                key: "unknown_field",
                message: "The requested field doesn't exist for this message"
            }];
        }

        if (errors === undefined || errors.length == 0) {
            this[valuesKey][p] = v;
        }
        return errors;
    },
    /**
     * Set multiple properties in the message in one go
     * @param values {Object} The collection of values keyed by the property name
     * @return {Object} collection of properties that had any validation errors
     */
    setProperties: function(values) {
        var errors = {};
        Object.keys(values).forEach(function(p) {
            var validation = this.setProperty(p, values[p]);
            if (validation !== undefined && validation.length > 0) {
                errors[p] = validation;
            }
        }.bind(this));
        return errors;
    }
};

module.exports = Message;
