var Queue = function() {
  this.count = 0;
  this.startIndex = 0;
  this.storage = {};
};

Queue.prototype.size = function() {
  return this.count;
};

Queue.prototype.enqueue = function(value) {
  this.storage[this.count + this.startIndex] = value;
  this.count++;
};

Queue.prototype.dequeue = function() {
  if (this.count > 0) {
    this.count--;
  }
  var value = this.storage[this.startIndex];
  delete this.storage[this.startIndex];
  this.startIndex++;
  return value;
};
