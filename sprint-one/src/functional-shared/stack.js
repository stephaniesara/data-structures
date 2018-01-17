var Stack = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  let newStack = {};
  newStack.count = 0;
  newStack.storage = {};
  extend(newStack, stackMethods);
  return newStack;
};

var extend = function(target, source) {
  for (let k in source) {
    target[k] = source[k];
  }
};

var stackMethods = {};

stackMethods.push = function(value) {
  this.storage[this.count++] = value;
};

stackMethods.pop = function() {
  if (this.count > 0) {
    return this.storage[--this.count];
  }
};

stackMethods.size = function() {
  return this.count;
};
