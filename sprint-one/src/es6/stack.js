class Stack {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  constructor() {
    this.count = 0;
    this.storage = {};
  }

  push(val) {
    this.storage[this.count++] = val;
  }

  pop() {
    if (this.count > 0) {
      return this.storage[--this.count];
    }
  }

  size() {
    return this.count;
  }
}
