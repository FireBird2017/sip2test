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
        },
        parameterKeys: {
            enumerable: true,
            get: function() {
                return this[namedParametersKey].map(function(p) {
                    return p.key;
                }).sort();
            }
        },
        parameterNames: {
            enumerable: true,
            get: function() {
                var namedNames = this[namedParametersKey].map(function(p) {
                        return p.name;
                    }),
                    fixedNames = this[fixedParametersKey].map(function(p) {
                        return p.name;
                    });
                return namedNames.concat(fixedNames).sort();
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
    },
    getParameterByName: function(name) {
        var fixed = this.getFixedParameterByName(name),
            named = this.getNamedParameterByName(name);

        return fixed || named;
    },
    iterateFixedParameters: function(cb) {
        var fixed = this[fixedParametersKey];
        fixed.forEach(function(p) {
            cb(p);
        });
    },
    iterateNamedParameters: function(cb){
        var named = this[namedParametersKey];
        var namedHash = {};
        named.forEach(function(p) {
            namedHash[p.key] = p;
        });
        Object.keys(namedHash).sort().forEach(function(k) {
            cb(namedHash[k]);
        });
    }
}

module.exports = MessageSchema;
