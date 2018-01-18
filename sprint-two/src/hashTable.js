

var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
};

HashTable.prototype.insert = function(k, v) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  let slotValue = this._storage.get(index);
  if (slotValue === undefined) {
    this._storage.set(index, {[k]: v});
  } else {
    slotValue[k] = v;
    this._storage.set(index, slotValue);
  }
};

HashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  if (this._storage.get(index) === undefined) {
    return undefined;
  }
  return (this._storage.get(index))[k];
};

HashTable.prototype.remove = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  let slotValue = this._storage.get(index);
  if (slotValue !== undefined) {
    delete slotValue[k];
    if (Object.keys(slotValue).length === 0) {
      this._storage.set(index, undefined);
    } else {
      this._storage.set(index, slotValue);
    }
  }
};

// HashTable.prototype._findEmptySlot = function(k) {
//   var index = getIndexBelowMaxForKey(k, this._limit);
//   while (index < this._limit && this._storage.get(index) !== undefined) {
//     ++index;
//   }
//   if (index === this._limit) {
//     throw Error('Not enough space in HashTable');
//   }
//   return index;
// };

/*
 * Complexity: What is the time complexity of the above functions?
 */


