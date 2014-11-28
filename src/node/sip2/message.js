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

/**
 * Parse the provided SIP2 message into a Message object
 * @param schema {MessageSchema} The schema of the message to parse
 * @param message {String} The message to parse
 * @return {Message} the parsed message
 */
Message.parse = function(schema, message) {
    var parsedValues = {};
    return new Message(schema, parsedValues);
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

        // Set the invalid value anyway
        this[valuesKey][p] = v;
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
    },
    /**
     * Perform validation of the entire message, checking that all of the properties are correct
     * @return {Object} collection of properties that had any validation errors
     */
    validate: function() {
        var validation = {};

        this.schema.parameterNames.forEach(function(p) {
            var value = this.getProperty(p),
                schemaProperty = this.schema.getParameterByName(p),
                errors;

            if (schemaProperty) {
                if (value === undefined) {
                    if (schemaProperty.required) {
                        errors = [{
                            key: "required_field",
                            message: "The requested field is required but not present"
                        }];
                    }
                } else {
                    errors = schemaProperty.type.validateInput(value);
                }
            } else {
                errors = [{
                    key: "unknown_field",
                    message: "The requested field doesn't exist for this message"
                }];
            }

            if (errors !== undefined && errors.length > 0) {
                validation[p] = errors;
            }
        }.bind(this));
        return validation;
    },
    /**
     * Format up the entire message into a valid SIP2 string
     * @return {String} the formatted up message
     */
    format: function() {
        var schema = this.schema,
            output;

        output = schema.id;
        schema.iterateFixedParameters(function(p) {
            var paramName = p.name,
                paramType = p.type,
                paramValue = this.getProperty(paramName);

            output += paramType.format(paramValue);
        }.bind(this));

        schema.iterateNamedParameters(function(p) {
            var paramName = p.name,
                paramKey = p.key,
                paramType = p.type,
                paramValue = this.getProperty(paramName);

            if (paramValue !== undefined) {
                output += "|" + paramKey + paramType.format(paramValue);
            }
        }.bind(this));
        return output;
    }
};

module.exports = Message;
