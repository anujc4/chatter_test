var sinon = require("sinon");

// Fake
/*
Functions which records arguments, return values, `this`, exceptions
With/Without behaviour
Immutable
*/

var cat = function() {
  return "meow";
};
// var cat = sinon.fake.returns("meow");
// var cat = sinon.fake.resolves("meow");
// var cat = sinon.fake.throws("I am not a cat.")
var cat = sinon.fake.rejects("I am not a cat");

var output = cat();
// console.log("Cat said", output);
output
  .then(x => {
    console.log("Cat said", x);
  })
  .catch(e => {
    console.log("Caught an error. Cat said", e.message);
  });

// .returns
var fn = function() {
  return "meow";
};

// .throws
var fn = function() {
  return new Error("bark");
};

// .resolves
var fn = function() {
  return new Promise.resolve("meow");
};

var fn = function() {
  return new Promise.reject("bark");
};
