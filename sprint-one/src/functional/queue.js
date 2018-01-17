var Queue = function() {
  let someInstance = {};

  // Use an object with numeric keys to store values
  let storage = {};
  let count = 0;
  let top = 0;

  // Implement the methods below

  someInstance.enqueue = function(value) {
    storage[count++] = value;
  };

  someInstance.dequeue = function() {
    if (top < count) {
      return storage[top++];
    }
  };

  someInstance.size = function() {
    return count - top;
  };

  return someInstance;
};
