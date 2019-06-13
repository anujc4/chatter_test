var assert = require("assert");

var a, b;

before(() => {
  a = 1;
  b = 1;
});

before(function setupVariablesAandB() {
  a = 1;
  b = 1;
});

before("initialize a and b to be 1", () => {
  a = 1;
  b = 1;
});

it("1 + 1 should be equal to 2", () => {
  assert.equal(2, a + b);
});
