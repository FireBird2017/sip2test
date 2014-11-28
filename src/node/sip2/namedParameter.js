function NamedParameter(name, key, type) {
    Object.defineProperties(this, {
        name: {
            value: name,
            writable: false,
            enumerable: true
        }, 
        key: {
            value: key,
            writable: false,
            enumerable: true
        },
        type: {
            value: type,
            writable: false,
            enumerable: true
        },
        required: {
            value: false,
            writable: false,
            enumerable: true
        }
    });
};

module.exports = NamedParameter;
