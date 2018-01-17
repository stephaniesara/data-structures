var Stack = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var newStack = {};
  newStack.count = 0;
  _.extend(newStack, stackMethods);
  return newStack;
};

var stackMethods = {};

stackMethods.size = function() {
  return this.count;
};

stackMethods.push = function(value) {
  this.count++;
};

stackMethods.pop = function() {
  if (this.count > 0) {
    this.count--;
  }
};
