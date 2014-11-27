var should = require("should"),
    assert = require("assert");

should.Assertion.add(
    "contains_error",
    function(key) {
        this.params = {
            operator: "contains the error key",
            expected: key
        };
        var errors = this.obj;
        var foundError = errors.find(function(e) {
            return e.key == key;
        });
        if (foundError === undefined) {
            assert.fail();
        }
    },
    false
);


