var HashTable = function() {
  this._limit = 8;
  this._count = 0;
  this._storage = LimitedArray(this._limit);
};

HashTable.prototype.findTuple = function(k, index) {
  return this._storage.get(index).find(function(ele) {
    return ele.value[0] === k;
  }); 
};

HashTable.prototype.insert = function(k, v) {
  ++(this._count);
  // if this insert goes above 75% double up
  if (this._count / this._limit > 0.75) {
    this._resize(2);
  }
  var index = getIndexBelowMaxForKey(k, this._limit);
  let slotValue = this._storage.get(index);
  let newSlotValue;
  if (slotValue === undefined) {
    newSlotValue = DoubleLinkedList();
  } else {
    newSlotValue = this._storage.get(index); 
    let node = this.findTuple(k, index);
    if (node !== undefined) {
      newSlotValue.removeNode(node);
    }
  }
  newSlotValue.addToHead([k, v]);
  this._storage.set(index, newSlotValue);
};

HashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  let slotValue = this._storage.get(index);
  if (slotValue === undefined) {
    return undefined;
  }
  if (this.findTuple(k, index)) {
    return this.findTuple(k, index).value[1];
  }
  return undefined;
};

HashTable.prototype.remove = function(k) {
  // if this remove goes below 25% halve the size 
  var index = getIndexBelowMaxForKey(k, this._limit);
  let slotValue = this._storage.get(index);
  if (slotValue !== undefined) {
    let node = this.findTuple(k, index);
    slotValue.removeNode(node);
    if (slotValue.isEmpty()) {
      this._storage.set(index, undefined);
    } else {
      this._storage.set(index, slotValue);
    }

    --(this._count);
    if (this._limit > 8 && this._count / this._limit < 0.25) {
      this._resize(0.5);
    }
  }
};

HashTable.prototype._resize = function(factor) {
  let oldLimit = this._limit;
  this._limit = Math.floor(this._limit * factor);
  let oldStorage = this._storage;
  this._storage = LimitedArray(this._limit);
  this._count = 0;
  let hashTable = this;
  oldStorage.each(function(ele, idx) {
    while (ele !== undefined && !ele.isEmpty()) {
      let tuple = ele.removeHead();
      hashTable.insert(tuple[0], tuple[1]);
    }
  });

  // An alternative way of looping through the LimitedArray
  // for (let i = 0; i < oldLimit; ++i) {
  //   let slotValue = oldStorage.get(i);
  //   while (slotValue !== undefined && !slotValue.isEmpty()) {
  //     let tuple = slotValue.removeHead();
  //     this.insert(tuple[0], tuple[1]);
  //   }
  // }  

};


/*
 * Complexity: What is the time complexity of the above functions?
 */
// .findTuple     O(n)  in relation to the number of tuples at that index
// .insert        O(n)  in relation to the number of tuples at that index
// .remove        O(n)  in relation to the number of tuples at that index
// .resize        O(n)