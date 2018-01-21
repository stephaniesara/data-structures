var BinarySearchTreeNode = function(value) {
  let node = Object.create(BinarySearchTreeNode.prototype);
  node.left = null;
  node.right = null;
  node.value = value;
  return node;
};

var BinarySearchTree = function(value) {
  var newBST = Object.create(BinarySearchTree.prototype);
  newBST.size = 1;
  newBST.maxHeight = 0;
  newBST.minHeight = Infinity;
  newBST.isRoot = true;
  newBST.root = BinarySearchTreeNode(value);
  newBST.rebalanced = false;
  return newBST;
};

BinarySearchTreeNode.prototype.insert = function(value) {
  var insertToSide = function(side, node) {
    if (node[side] === null) {
      node[side] = BinarySearchTreeNode(value);
      return 1;
    } else {
      return node[side].insert(value);
    }
  };

  let depth;
  if (value < this.value) {
    depth = 1 + insertToSide('left', this);
  } else if (value > this.value) {
    depth = 1 + insertToSide('right', this);
  }
  return depth;
};

BinarySearchTreeNode.prototype.contains = function(value) {
  if (this.value === value) {
    return true;
  } else if (this.value > value) {   
    return !!this.left && this.left.contains(value);
  } else {
    return !!this.right && this.right.contains(value);
  }  
};

BinarySearchTreeNode.prototype.depthFirstLog = function(cb) {
  if (typeof cb !== 'function') {
    return;
  }
  cb(this.value);
  !!this.left && this.left.depthFirstLog(cb);
  !!this.right && this.right.depthFirstLog(cb);
};

BinarySearchTreeNode.prototype._updateMinMaxHeight = function(tree, depth) {
  if (tree.maxHeight < depth) {
    tree.maxHeight = depth;
  } 
  if (tree.minHeight > depth) {
    tree.minHeight = depth;
  } 
};

BinarySearchTreeNode.prototype._calculateMinMaxHeight = function(tree, depth) {
  ++depth;
  if ((this.left === null) || (this.right === null)) {
    this._updateMinMaxHeight(tree, depth);
  }
  !!this.right && this.right._calculateMinMaxHeight(tree, depth);
  !!this.left && this.left._calculateMinMaxHeight(tree, depth);
};

BinarySearchTree.prototype.rebalance = function(shouldRebalance) {
  this.rebalanced = shouldRebalance;
};

BinarySearchTree.prototype.calculateHeight = function() {
  this.maxHeight = 0;
  this.minHeight = Infinity;
  !!this.root && this.root._calculateMinMaxHeight(this, 0);
};

BinarySearchTree.prototype.insert = function(value) {
  ++(this.size);
  let depth = this.root.insert(value);  
  this.root._updateMinMaxHeight(this, depth);
  if (this.rebalanced && this.maxHeight > 2 * this.minHeight) {
    this.rebalanceDSW();
    this.calculateHeight();
  } 
};

BinarySearchTreeNode.prototype.breadthFirstLog = function(cb, childrenQueue) {
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

BinarySearchTreeNode.prototype.findClosest = function(target) {
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

BinarySearchTree.prototype.contains = function(value) {
  return this.root.contains(value);
};

BinarySearchTree.prototype.depthFirstLog = function(cb) {
  this.root.depthFirstLog(cb);
};

BinarySearchTree.prototype.breadthFirstLog = function(cb, childrenQueue) {
  this.root.breadthFirstLog(cb, childrenQueue);
};

BinarySearchTree.prototype.findClosest = function(target) {
  return this.root.findClosest(target);
};

/**
 * Implements the Day-Stout-Warren algorithm
 * https://en.wikipedia.org/wiki/Day%E2%80%93Stout%E2%80%93Warren_algorithm
 */

BinarySearchTree.prototype.treeToVine = function() {
  let tail = this.root;
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

  let size = this.size;
  let leaves = size + 1 - Math.pow(2, Math.floor(Math.log2(size + 1)));
  compress(this.root, leaves);
  size -= leaves;
  while (size > 1) {
    size = Math.floor(size / 2);
    compress(this.root, size);
  }
};

BinarySearchTree.prototype.rebalanceDSW = function() {
  let pseudoRoot = BinarySearchTree();
  pseudoRoot.root.right = this.root;
  pseudoRoot.size = this.size;
  pseudoRoot.treeToVine();
  pseudoRoot.vineToTree();

  this.root = pseudoRoot.root.right;
  this.isRoot = true;
  this.size = pseudoRoot.size;
  this.maxHeight = pseudoRoot.maxHeight;
  this.minHeight = pseudoRoot.minHeight;

  return this;
};


/*
 * Complexity: What is the time complexity of the above functions?
 */
// .insert       O(logn)  Although depending on order of inputs it can be O(n)
// .contains     O(logn)  Although depending on order of inputs it can be O(n)
// .depthFirstLog     O(n)
// .breadthFirstLog   O(n)
// .findClosest  O(logn)