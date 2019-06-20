/*
  Functions with pre-programmed behaviour
  Built on top of spy

  USECASES
  1. Mock authentication
  2. Control the behaviour of your code
  3. If your code is calling an API via XHR
  sinon.stub(object, "Method")
*/

var sinon = require("sinon");

originalCallback = function(input) {
  switch (input) {
    case 1:
      return "invoked with one";
    case 2:
      return "invoked with two";
    default:
      return "invoked with no or unhandled argument";
  }
};

a = originalCallback("1");

var callback = sinon.stub();
callback.withArgs(1).returns("one");
callback.withArgs(2).returns("two");
callback.withArgs(3).throws("three is not allowed");

value0 = callback();
value0;

value1 = callback(1);
value1;

value2 = callback(2);
value2;

try {
  callback(3);
} catch (e) {
  console.log(e.name);
}
