var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  let newQueue = {};
  newQueue.storage = {};
  newQueue.bottom = 0;
  newQueue.top = 0;
  extend(newQueue, queueMethods);

  // Use an object with numeric keys to store values
  return newQueue;
};

var extend = function(target, source) {
  for (let k in source) {
    target[k] = source[k];
  }
};

var queueMethods = {};
queueMethods.enqueue = function(value) {
  this.storage[this.bottom++] = value;
};

queueMethods.dequeue = function() {
  if (this.top < this.bottom) {
    return this.storage[this.top++];
  }
};

queueMethods.size = function() {
  return this.bottom - this.top;
};
