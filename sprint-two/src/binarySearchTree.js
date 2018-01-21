var BinarySearchTree = function(value, isroot) {
  var newBST = Object.create(BinarySearchTree.prototype);
  newBST.left = null;
  newBST.right = null;
  newBST.value = value;
  newBST.root = isroot === undefined ? {isRoot: true, size: 1} : {isRoot: false, size: 0};
  return newBST;
};

BinarySearchTree.prototype.insert = function(value) {

  var insertToSide = function(side, node) {
    if (node[side] === null) {
      node[side] = BinarySearchTree(value, false);
      
    } else {
      node[side].insert(value);
    }
  };
  if (this.root.isRoot) {
    ++(this.root.size);
  }
  if (value < this.value) {
    insertToSide('left', this);
  } else if (value > this.value) {
    insertToSide('right', this);
  }
};

BinarySearchTree.prototype.contains = function(value) {
  if (this.value === value) {
    return true;
  } else if (this.value > value) {   
    return !!this.left && this.left.contains(value);
  } else {
    return !!this.right && this.right.contains(value);
  }  
};

BinarySearchTree.prototype.depthFirstLog = function(cb) {
  if (typeof cb !== 'function') {
    return;
  }
  cb(this.value);
  !!this.left && this.left.depthFirstLog(cb);
  !!this.right && this.right.depthFirstLog(cb);
};

BinarySearchTree.prototype.breadthFirstLog = function(cb, childrenQueue) {
  if (typeof cb !== 'function') {
    return;
  }
  childrenQueue = childrenQueue === undefined ? LinkedList() : childrenQueue;
  cb(this.value);
  !!this.left && childrenQueue.addToTail(this.left);
  !!this.right && childrenQueue.addToTail(this.right);
  var nextNode = childrenQueue.removeHead();
  if (nextNode !== null) {
    nextNode.breadthFirstLog(cb, childrenQueue);
  }
};

BinarySearchTree.prototype.findClosest = function(target) {
  if (!!this.right && this.value < target) {
    return this.right.findClosest(target);
  } else if (!!this.left && this.value > target) {
    return this.left.findClosest(target);
  }
  return this.value;
};
// This is a way of avoiding utilizing 'this' to its best capacity
// BinarySearchTree.prototype.findClosest = function(target, parent) {
//   if (!!this.right && this.value < target) {
//     return this.right.findClosest(target, this.right);
//   } else if (!!this.left && this.value > target) {
//     return this.left.findClosest(target, this.left);
//   }
//   return parent.value;
// };

/**
 * Implements the Day-Stout-Warren algorithm
 * https://en.wikipedia.org/wiki/Day%E2%80%93Stout%E2%80%93Warren_algorithm
 */

BinarySearchTree.prototype.treeToVine = function() {
  let tail = this;
  let rest = tail.right;
  while (rest !== null) {
    if (rest.left === null) {
      tail = rest;
      rest = rest.right;
    } else {
      let temp = rest.left;
      rest.left = temp.right;
      temp.right = rest;
      rest = temp;
      tail.right = temp;
    }
  }
};


BinarySearchTree.prototype.vineToTree = function() {
  var compress = function(root, count) {
    let scanner = root;
    for (let i = 0; i < count; ++i) {
      let child = scanner.right;
      scanner.right = child.right;
      scanner = scanner.right;
      child.right = scanner.left;
      scanner.left = child;
    }
  };

  let size = this.root.size;
  let leaves = size + 1 - Math.pow(2, Math.floor(Math.log2(size + 1)));
  compress(this, leaves);
  size -= leaves;
  while (size > 1) {
    size = Math.floor(size / 2);
    compress(this, size);
  }
};

BinarySearchTree.prototype.rebalanceDSW = function() {
  let pseudoRoot = BinarySearchTree();
  pseudoRoot.right = this;
  pseudoRoot.root.size = this.root.size;
  this.root.isRoot = false;
  this.root.size = 0;

  pseudoRoot.treeToVine();
  pseudoRoot.vineToTree();

  let newRoot = pseudoRoot.right;
  newRoot.root.isRoot = true;
  newRoot.root.size = pseudoRoot.root.size;

  pseudoRoot.right = null;
  pseudoRoot.left = null;
  return newRoot;
};


/*
 * Complexity: What is the time complexity of the above functions?
 */
// .insert       O(logn)  Although depending on order of inputs it can be O(n)
// .contains     O(logn)  Although depending on order of inputs it can be O(n)
// .depthFirstLog     O(n)
// .breadthFirstLog   O(n)
// .findClosest  O(logn)