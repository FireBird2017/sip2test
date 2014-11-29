var util = require("util");

/**
 * Datatype representation for an Integer type
 * @constructor
 */
function IntegerType() {
    Object.defineProperties(this, {
        min: {
            enumerable: true,
            writable: true,
            value: undefined
        },
        max: {
            enumerable: true,
            writable: true,
            value: undefined
        }
    });
}

IntegerType.prototype = {
    /**
     * Format up the provided value
     * @param v {Number} The value to format
     * @return the formatted value
     */
    format: function(v) {
        return "" + v;
    },
    /**
     * Parse the given string as an Integer
     * @param v {String} The value to parse
     * @return {Number} the parsed value
     */
    parse: function(v) {
        return parseInt(v);
    },
    /**
     * Validate the provided value is correct for this data type
     * @param v {Any} the value to validate
     * @return any validation errors
     */
    validateInput: function(v) {
        var errors = [];
        if (!(typeof(v) == "number" && v % 1 === 0)) {
            errors.push({
                key: "type_mismatch",
                message: util.format("Value is of incorrect type. Expected an integral 'number' but got '%s'",
                    typeof(v))
            });
        } else {
            // It's a Integer, so check everything else about it
            if (this.min !== undefined && v < this.min) {
                errors.push({
                    key: "min",
                    message: util.format("Value is too low. Min Value is %d but value is %d", 
                        this.min, v.length)
                });
            }
            if (this.max !== undefined && v > this.max) {
                errors.push({
                    key: "max",
                    message: util.format("Value is too high. Max Value is %d but value is %d", 
                        this.max, v.length)
                });
            }
        }
        return errors;
    },
    withMin: function(v) {
        this.min = v;
        return this;
    },
    withoutMin: function() {
        this.min = undefined;
        return this;
    },
    withMax: function(v) {
        this.max = v;
        return this;
    },
    withoutMax: function() {
        this.max = undefined;
        return this;
    }
};

module.exports = IntegerType;
