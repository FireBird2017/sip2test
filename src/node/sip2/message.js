var Symbol = require("symbol"),
    valuesKey = Symbol("values");

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
    getProperty: function(p) {
        return this[valuesKey][p];
    },
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
