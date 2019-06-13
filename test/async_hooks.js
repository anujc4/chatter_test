var assert = require("assert");
var a;

before(function(done) {
  var func = function() {
    a = 1;
    done();
  };
  setTimeout(func, 1000);
});

it("a should be equal to 1", function() {
  assert.equal(1, a);
});
