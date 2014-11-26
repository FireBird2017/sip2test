require("es6-shim");

var Symbol = require("symbol"),
    FixedParameter = require("./fixedParameter"),
    NamedParameter = require("./namedParameter");

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
        },
        numFixedParameters: {
            enumerable: true,
            get: function() {
                return this[fixedParametersKey].length;
            }
        },
        numNamedParameters: {
            enumerable: true,
            get: function() {
                return this[namedParametersKey].length;
            }
        }
    });

    this[fixedParametersKey] = [];
    this[namedParametersKey] = [];
}

MessageSchema.prototype = {
    withFixedParameter: function(name, size, type) {
        this[fixedParametersKey].push(new FixedParameter(name, size, type));
        return this;
    },
    withNamedParameter: function(name, key, type) {
        this[namedParametersKey].push(new NamedParameter(name, key, type));
        return this;
    },
    getFixedParameterByPosition: function(pos) {
        return this[fixedParametersKey][pos];
    },
    getFixedParameterByName: function(name) {
        return this[fixedParametersKey].find(function(e) {
            return e.name === name;
        });
    },
    getNamedParameterByKey: function(key) {
        return this[namedParametersKey].find(function(e) {
            return e.key === key;
        });
    },
    getNamedParameterByName: function(name) {
        return this[namedParametersKey].find(function(e) {
            return e.name === name;
        });
    }
}

module.exports = MessageSchema;
