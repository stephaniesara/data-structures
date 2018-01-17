class Queue {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  constructor() {
    this.top = 0;
    this.bottom = 0;
    this.storage = {};
  }

  enqueue(val) {
    this.storage[this.bottom++] = val;
  }

  dequeue() {
    if (this.top < this.bottom) {
      return this.storage[this.top++];
    }
  }
  
  size() {
    return this.bottom - this.top;
  }
}
