var Tree = function(value) {
  var newTree = {};
  newTree.value = value;

  // your code here
  newTree.children = [];
  _.extend(newTree, treeMethods);
  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value) {
  this.children.push(Tree(value));
};

treeMethods.contains = function(target) {
  if (this.value === target) {
    return true;
  }
  return this.children.reduce(function(accumulator, elem) {
    return elem.contains(target) || accumulator;
  }, false);
};

treeMethods.traverse = function(cb) {
  cb(this.value);
  for (let i = 0; i < this.children.length; i++) {
    this.children[i].traverse(cb);
  }
};


/*
 * Complexity: What is the time complexity of the above functions?
 */
