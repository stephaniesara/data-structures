var Queue = function() {
  var someInstance = {};
  var count = 0;
  var startIndex = 0;
  // Use an object with numeric keys to store values
  let storage = {};
  let count = 0;
  let top = 0;

  // Implement the methods below

  someInstance.enqueue = function(value) {
    storage[count + startIndex] = value;
    count++;
  };

  someInstance.dequeue = function() {
    if (count > 0) {
      count--;
    }
    var value = storage[startIndex];
    delete storage[startIndex];
    startIndex++;
    return value;
  };

  someInstance.size = function() {
    return count;
  };

  return someInstance;
};
