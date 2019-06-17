var assert = require("chai").assert;
var expect = require("chai").expect;
var should = require("chai").should();
var axios = require("axios");

var foo = "bar";

it("given jsonplaceholder api and test in assert when calling /todos/1 then the response should be correct", done => {
  axios
    .get("https://jsonplaceholder.typicode.com/todos/1")
    .then(resp => {
      resp = resp.data;
      assert.lengthOf(foo, 3);
      assert.equal(resp.title, "delectus aut autem");
      assert.equal(resp.id, 1);
      done();
    })
    .catch(exp => {
      done(exp);
    });
});

it("given jsonplaceholder api and test in expect when calling /todos/1 then the response should be correct", done => {
  axios
    .get("https://jsonplaceholder.typicode.com/todos/1")
    .then(resp => {
      resp = resp.data;
      expect(foo).to.have.lengthOf(3);
      // expect([1, 2, 3]).contains(1);
      // assert([1,2,3].find(x => x == 1), 1)
      expect(resp.title).to.be.equal("delectus aut autem");
      expect(resp.id).to.be.equal(1);
      done();
    })
    .catch(done);
});

it("given jsonplaceholder api and test in should when calling /todos/1 then the response should be correct", done => {
  axios
    .get("https://jsonplaceholder.typicode.com/todos/1")
    .then(resp => {
      resp = resp.data;
      title = resp.title;
      id = resp.id;
      foo.should.have.lengthOf(3);
      title.should.equal("delectus aut autem");
      id.should.equal(1);
      done();
    })
    .catch(done);
});
