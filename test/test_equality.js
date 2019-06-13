var assert = require("assert");

// JAVA:: Before Class -> (Before -> Test -> After) -> After Class
// NODE:: Before -> (BeforeEach -> it -> AfterEach) -> After

describe("equality test", () => {
  before(() => {
    console.log("BEFORE");
  });

  beforeEach(() => {
    console.log("BEFORE EACH");
  });

  afterEach(() => {
    console.log("AFTER EACH");
  });

  after(() => {
    console.log("AFTER");
  });

  it("string(1) is equal to int(1) without strict equality", () => {
    assert.equal("1", 1);
  });

  it("int(1) is equal to int(1) without strict equality", () => {
    assert.equal(1, 1);
  });

  it("int(1) is strictly equal to int(1) with strict equality", () => {
    assert.strictEqual(1, 1);
  });

  it("string(1) is  not equal to int(1) with strict equality", () => {
    assert.notStrictEqual("1", 1);
  });
});
