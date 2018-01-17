class Queue {
  constructor() {
    this.count = 0;
    this.startIndex = 0;
    this.storage = {};
  }
  size () {
    return this.count;
  }

  enqueue(value) {
    this.storage[this.count + this.startIndex] = value;
    this.count++;
  }

  dequeue() {
    if (this.count > 0) {
      this.count--;
    }
    var value = this.storage[this.startIndex];
    delete this.storage[this.startIndex];
    this.startIndex++;
    return value;
  }
}
