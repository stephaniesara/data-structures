var LinkedList = function() {
  let list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value) {
    let node = Node(value);
    if (list.tail) {
      list.tail.next = node;
    } else {
      list.head = node;
    }
    list.tail = node;
  };

  list.removeHead = function() {
    if (list.head === null) {
      return null;
    }
    let newHead = list.head.next;
    list.head.next = null;
    let oldHead = list.head;
    list.head = newHead;
    return oldHead.value;
  };

  list.addToHead = function(value) {
    let node = Node(value);
    node.next = list.head;
    list.head = node;
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

  return list;
};

var Node = function(value) {
  let node = {};

  node.value = value;
  node.next = null;

  return node;
};


/*
 * Complexity: What is the time complexity of the above functions?
 */

// .addToTail    O(1)
// .removeHead   O(1)
// .addToHead    O(1)
// .contains     O(n)
