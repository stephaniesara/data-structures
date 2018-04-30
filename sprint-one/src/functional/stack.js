var Stack = function() {
  let someInstance = {};

  // Use an object with numeric keys to store values
  let storage = {};
  let count = 0;

  var count = 0;

  // Implement the methods below
  someInstance.push = function(value) {
    storage[count] = value;
    count++;
  };

  someInstance.pop = function() {
    if (count > 0) {
      count--;
    }
    return storage[count];
  };

  someInstance.size = function() {
    return count;
  };

  return someInstance;
};
