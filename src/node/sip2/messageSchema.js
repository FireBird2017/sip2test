function MessageSchema(id, name) {
    this.id = id;
    this.name = name;
    this.fixedParameters = [];
    this.namedParameters = [];
}

MessageSchema.prototype = {
    withFixedParameter: function(name, size, type) {
        this.fixedParameters.push(new FixedParameter(name, size, type));
    },
    withNamedParameter: function(name, key, type) {
        this.namedParameters.push(new NamedParameter(name, key, type));
    }
}

module.exports = MessageSchema;
