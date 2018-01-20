var DoubleLinkedList = function() {
  let list = {};
  list.head = null;
  list.tail = null; 

  list.addToHead = function(value) {
    if (list.head) {
      let newHead = DoubleLinkedNode(value);
      list.head.prev = newHead;
      newHead.next = list.head;
      list.head = newHead;
    } else {
      list.addToTail(value);
    }
  };

  list.addToTail = function(value) {
    let node = DoubleLinkedNode(value);
    if (list.tail) {
      list.tail.next = node;
      node.prev = list.tail;
    } else {
      list.head = node;
    }
    list.tail = node;
  };

  list.removeHead = function() {
    let newHead = list.head.next;
    let oldHead = list.head;
    list.head = newHead;
    !!list.head && (list.head.prev = null);
    return oldHead.value;
  };

  list.removeTail = function() {
    !!list.tail && !!list.tail.prev && (list.tail.prev.next = null);
    let val = list.tail.value;
    list.tail = list.tail.prev;
    return val;
  };

  list.contains = function(target) {
    let node = list.head;
    while (node) {
      if (node.value === target) {
        return true;
      }
      node = node.next;
    }
    return false;
  };

  list.find = function(fn) {
    let node = list.head;
    while (node) {
      if (fn(node)) {
        return node;
      }
      node = node.next;
    }
    return undefined;
  };

  list.isEmpty = function() {
    return list.head === null;
  };

  list.removeNode = function(target) {
    target.next === null ? (list.tail = target.prev) : (target.next.prev = target.prev);
    target.prev === null ? (list.head = target.next) : (target.prev.next = target.next);
  };

  return list;
};

var DoubleLinkedNode = function(value) {
  let node = {};

  node.value = value;
  node.prev = null;
  node.next = null;

  return node;
};