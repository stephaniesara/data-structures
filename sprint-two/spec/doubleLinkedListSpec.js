describe('doubleLinkedList', function() {
  var doubleLinkedList;

  beforeEach(function() {
    doubleLinkedList = DoubleLinkedList();
  });

  it('should have a head and tail', function() {
    expect(doubleLinkedList).to.have.property('head');
    expect(doubleLinkedList).to.have.property('tail');
  });

  it('should have methods named "addToTail", "removeHead", and "contains"', function() {
    expect(doubleLinkedList.addToTail).to.be.a('function');
    expect(doubleLinkedList.removeHead).to.be.a('function');
    expect(doubleLinkedList.contains).to.be.a('function');
  });

  it('should designate a new head when new nodes are added in the head', function() {
    doubleLinkedList.addToHead(4);
    expect(doubleLinkedList.head.value).to.equal(4);
    doubleLinkedList.addToHead(5);
    expect(doubleLinkedList.head.value).to.equal(5);
  });

  it('should link to old head when new nodes are added in the head', function() {
    doubleLinkedList.addToHead(4);
    doubleLinkedList.addToHead(5);
    expect(doubleLinkedList.head.next.value).to.equal(4);
    expect(doubleLinkedList.head.next.prev.value).to.equal(5);
  });

  it('should designate a new tail when new nodes are added', function() {
    doubleLinkedList.addToTail(4);
    expect(doubleLinkedList.tail.value).to.equal(4);
    doubleLinkedList.addToTail(5);
    expect(doubleLinkedList.tail.value).to.equal(5);
  });

  it('should link back to previous tail when new nodes are added', function() {
    doubleLinkedList.addToTail(4);
    doubleLinkedList.addToTail(5);
    expect(doubleLinkedList.tail.value).to.equal(5);
    expect(doubleLinkedList.tail.prev.value).to.equal(4);
  });

  it('should remove the head from the list when removeHead is called', function() {
    doubleLinkedList.addToTail(4);
    doubleLinkedList.addToTail(5);
    expect(doubleLinkedList.head.value).to.equal(4);
    doubleLinkedList.removeHead();
    expect(doubleLinkedList.head.value).to.equal(5);
  });

  it('should empty the list when last element is removed via removeHead', function() {
    doubleLinkedList.addToHead(4);
    doubleLinkedList.removeHead();
    expect(doubleLinkedList.head).to.equal(null);
  });

  it('should make sure the new head does not link back to any node when removeHead is called', function() {
    doubleLinkedList.addToTail(4);
    doubleLinkedList.addToTail(5);
    doubleLinkedList.removeHead();
    expect(doubleLinkedList.head.prev).to.equal(null);
  });

  it('should remove the tail from the list when removeTail is called', function() {
    doubleLinkedList.addToTail(4);
    doubleLinkedList.addToTail(5);
    expect(doubleLinkedList.removeTail()).to.equal(5);
    expect(doubleLinkedList.tail.value).to.equal(4);
  });

  it('should empty the list when last element is removed via removeTail', function() {
    doubleLinkedList.addToTail(4);
    expect(doubleLinkedList.removeTail()).to.equal(4);
    expect(doubleLinkedList.tail).to.equal(null);
  });

  it('should make sure the new tail next points to null when removeTail is called', function() {
    doubleLinkedList.addToTail(4);
    doubleLinkedList.addToTail(5);
    expect(doubleLinkedList.removeTail()).to.equal(5);
    expect(doubleLinkedList.tail.next).to.equal(null);
  });

  it('should return the value of the former head when removeHead is called', function() {
    doubleLinkedList.addToTail(4);
    expect(doubleLinkedList.removeHead()).to.equal(4);
  });

  it('should contain a value that was added', function() {
    doubleLinkedList.addToTail(4);
    doubleLinkedList.addToTail(5);
    expect(doubleLinkedList.contains(4)).to.equal(true);
    expect(doubleLinkedList.contains(5)).to.equal(true);
    expect(doubleLinkedList.contains(6)).to.equal(false);
  });

  it('should not contain a value that was removed', function() {
    doubleLinkedList.addToTail(4);
    doubleLinkedList.addToTail(5);
    doubleLinkedList.removeHead();
    expect(doubleLinkedList.contains(4)).to.equal(false);
  });

  // add more tests here to test the functionality of doubleLinkedList
});
