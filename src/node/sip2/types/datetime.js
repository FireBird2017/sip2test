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
