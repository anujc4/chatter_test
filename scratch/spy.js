var sinon = require("sinon");
var assert = require("assert");

var object = {
  method: function() {}
};

var spy = sinon.spy(object, "method");

object.method(1);
// object.method(1);
object.method(2);
object.method(2);

assert(spy.withArgs(1).calledOnce);
assert(spy.withArgs(2).calledTwice);
assert(spy.withArgs(3).notCalled);
