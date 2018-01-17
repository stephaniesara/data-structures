var Queue = function() {
  var newQueue = {};
  newQueue.count = 0;
  newQueue.startIndex = 0;
  newQueue.storage = {};
  _.extend(newQueue, queueMethods);
  return newQueue;
};

var queueMethods = {};

queueMethods.size = function() {
  return this.count;
};

queueMethods.enqueue = function(value) {
  this.storage[this.count + this.startIndex] = value;
  this.count++;
};

queueMethods.dequeue = function() {
  if (this.count > 0) {
    this.count--;
  }
  var value = this.storage[this.startIndex];
  delete this.storage[this.startIndex];
  this.startIndex++;
  return value;
};
