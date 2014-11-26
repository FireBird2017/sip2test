function FixedParameter(name, size, type) {
    Object.defineProperties(this, {
        name: {
            value: name,
            writable: false,
            enumerable: true
        }, 
        size: {
            value: size,
            writable: false,
            enumerable: true
        },
        type: {
            value: type,
            writable: false,
            enumerable: true
        }
    });
};

module.exports = FixedParameter;
