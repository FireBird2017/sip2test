var util = require("util"),
    moment = require("moment-timezone");

/**
 * Datatype representation for a DateTime type
 * @constructor
 */
function DateTimeType() {
}

DateTimeType.prototype = {
    /**
     * Format up the provided value
     * @param v {Number} The value to format
     * @return the formatted value
     */
    format: function(v) {
        return v.tz("UTC").format("YYYYMMDD[   Z]HHmmss");
    },
    /**
     * Parse the given string as an Integer
     * @param v {String} The value to parse
     * @return {Number} the parsed value
     */
    parse: function(v) {
        return moment(v, "YYYYMMDD[   Z]HHmmss").tz("UTC");
    },
    /**
     * Validate the provided value is correct for this data type
     * @param v {Any} the value to validate
     * @return any validation errors
     */
    validateInput: function(v) {
        var errors = [];
        if (!moment.isMoment(v)) {
            errors.push({
                key: "type_mismatch",
                message: "Value is of incorrect type. Expected a Moment"
            });
        }
        return errors;
    }
};

module.exports = DateTimeType;
