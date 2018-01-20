var BinarySearchTree = function(value) {
  var newBST = Object.create(BinarySearchTree.prototype);
  newBST.left = null;
  newBST.right = null;
  newBST.value = value;
  return newBST;
};

BinarySearchTree.prototype.insert = function(value) {

  var insertToSide = function(side, node) {
    if (node[side] === null) {
      node[side] = BinarySearchTree(value);
    } else {
      node[side].insert(value);
    }
  };
  
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

/*
 * Complexity: What is the time complexity of the above functions?
 */
// .insert       O(logn)  Although depending on order of inputs it can be O(n)
// .contains     O(logn)  Although depending on order of inputs it can be O(n)
// .depthFirstLog     O(n)
// .breadthFirstLog   O(n)
// .findClosest  O(logn)