var util = require("util"),
    moment = require("moment-timezone");

function DateTimeType() {
}

DateTimeType.prototype = {
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
