var Symbol = require("symbol");

var fixedParametersKey = Symbol("fixedParameters");
var namedParametersKey = Symbol("namedParameters");

function MessageSchema(id, name) {
    Object.defineProperties(this, {
        name: {
            value: name,
            writable: false,
            enumerable: true
        }, 
        id: {
            value: id,
            writable: false,
            enumerable: true
        }
    });

    this[fixedParametersKey] = [];
    this[namedParametersKey] = [];
}

MessageSchema.prototype = {
    withFixedParameter: function(name, size, type) {
        this[fixedParametersKey].push(new FixedParameter(name, size, type));
    },
    withNamedParameter: function(name, key, type) {
        this[namedParametersKey].push(new NamedParameter(name, key, type));
    }
}

module.exports = MessageSchema;
