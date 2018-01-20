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

treeMethods.removeChild = function(value) {
  var indexOfValue = this.children.findIndex(function(elem) {
    return value === elem.value;
  });
  if (indexOfValue > -1) {
    this.children.splice(indexOfValue, 1);
  }
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
// .addChild      O(1)
// .removeChild   O(n) on the number of children at the node 
// .contains      O(n)
// .traverse      O(n)
