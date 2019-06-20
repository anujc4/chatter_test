var sinon = require("sinon");

var animal = {};
animal.sayName = function nameFn() {
  return "Animal is a cat";
};

sinon.stub(animal, "sayName").callsFake(function fakeNameFn() {
  return "Animal is a dog";
});

console.log(animal.sayName());

animal.sayName.restore();

console.log(animal.sayName());
