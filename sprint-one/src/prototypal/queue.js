var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  let obj = Object.create(queueMethods);
  obj.bottom = 0;
  obj.top = 0;
  obj.storage = {};
  return obj;
};

var queueMethods = {};

queueMethods.enqueue = function(val) {
  this.storage[this.bottom++] = val;
};
queueMethods.dequeue = function() {
  if (this.top < this.bottom) {
    return this.storage[this.top++];
  }
};

queueMethods.size = function() {
  return this.bottom - this.top;
};
