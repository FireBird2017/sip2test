var should = require("should"),
    Q = require("q");

require("mocha-as-promised")();

describe("test", function() {
    describe("1 + 1", function() {
        var answer = 1 + 1;
        it("should be 2", function() {
            answer.should.equal(2);
        });
    });
});
