var Stack = function() {
  this.count = 0;
  this.storage = {};
};

<<<<<<< HEAD
Stack.prototype.push = function(val) {
  this.storage[this.count++] = val;
};

  this.storage[this.count] = value;
  this.count++;
}

Stack.prototype.pop = function() {
  if (this.count > 0) {
    this.count--;
  }
  var value = this.storage[this.count];
  delete this.storage[this.count];
  return value;
}

//var StackOne = new Stack();
>>>>>>> f843cd228356b323ab0d91e641775fa8780900ec
