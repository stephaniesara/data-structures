var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  this.storage = {};
  this.bottom = 0;
  this.top = 0;
};


Queue.prototype.enqueue = function(val) {
  this.storage[this.bottom++] = val;
};

Queue.prototype.dequeue = function() {
  if (this.top < this.bottom) {
    return this.storage[this.top++];
  }
};

Queue.prototype.size = function() {
  return this.bottom - this.top;
};
