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
        this[valuesKey][p] = v;
    },
    setProperties: function(values) {
        Object.keys(values).forEach(function(p) {
            this.setProperty(p, values[p]);
        }.bind(this));
    }
};

module.exports = Message;
