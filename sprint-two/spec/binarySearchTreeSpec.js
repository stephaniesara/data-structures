describe('binarySearchTree', function() {
  var binarySearchTree;

  beforeEach(function() {
    binarySearchTree = BinarySearchTree(5);
  });

  it('should have methods named "insert", "contains", and "depthFirstLog', function() {
    expect(binarySearchTree.insert).to.be.a('function');
    expect(binarySearchTree.contains).to.be.a('function');
    expect(binarySearchTree.depthFirstLog).to.be.a('function');
  });

  it('should insert values at the correct location in the tree', function() {
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    binarySearchTree.insert(6);
    expect(binarySearchTree.left.right.value).to.equal(3);
    expect(binarySearchTree.right.left.value).to.equal(6);
  });

  it('should have the correct size after inserting values in the tree', function() {
    expect(binarySearchTree.root.size).to.equal(1);
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    binarySearchTree.insert(6);
    expect(binarySearchTree.root.size).to.equal(5);
    expect(binarySearchTree.left.root.size).to.equal(0);
    expect(binarySearchTree.left.right.root.size).to.equal(0);
    expect(binarySearchTree.right.root.size).to.equal(0);
    expect(binarySearchTree.right.left.root.size).to.equal(0);
  });

  it('should have a working "contains" method', function() {
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    expect(binarySearchTree.contains(7)).to.equal(true);
    expect(binarySearchTree.contains(8)).to.equal(false);
  });

  it('should execute a callback on every value in a tree using "depthFirstLog"', function() {
    var array = [];
    var func = function(value) { array.push(value); };
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    binarySearchTree.depthFirstLog(func);
    expect(array).to.eql([5, 2, 3, 7]);
  });

  it('should execute "depthFirstLog" without error even when user passes callback not to spec', function() {
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    binarySearchTree.depthFirstLog(null);
    binarySearchTree.depthFirstLog(undefined);
    binarySearchTree.depthFirstLog();
    binarySearchTree.depthFirstLog(8);
    expect(true).to.eql(true);
  });

  it('should execute a callback on every value in a tree using "breadthFirstLog"', function() {
    var array = [];
    var func = function(value) { array.push(value); };
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    binarySearchTree.breadthFirstLog(func);
    expect(array).to.eql([5, 2, 7, 3]);
  });

  it('should execute "breadthFirstLog" without error even when user passes callback not to spec', function() {
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    binarySearchTree.breadthFirstLog(null);
    binarySearchTree.breadthFirstLog(undefined);
    binarySearchTree.breadthFirstLog();
    binarySearchTree.breadthFirstLog(8);
    expect(true).to.eql(true);
  });

  xit('should have a working "findClosest" method', function() {
    binarySearchTree.insert(100);
    for (let i = 0; i < 1000000; ++i) {
      binarySearchTree.insert(Math.floor((Math.random() * 100000)) + 101);
    }
    binarySearchTree.insert(2000000);
    expect(binarySearchTree.findClosest(99)).to.equal(100);
    expect(binarySearchTree.findClosest(2000000)).to.equal(2000000);
    expect(binarySearchTree.findClosest(3000000)).to.equal(2000000);
  });

  it('should transform tree to linkedList if starting in order', function() {
    var resultTree = BinarySearchTree(0);
    var resultArray = [1, 2, 7, 5, 3, 4, 6];
    for (var i = 0; i < resultArray.length; i++) {
      resultTree.insert(resultArray[i]);
    }

    resultTree.treeToVine();
    var node = resultTree;
    for (var i = 0; i < resultArray.length; i++) {
      expect(node.value).to.equal(i);
      node = node.right;
    }
  });

  it('should transform a vine into a balance tree', function() {
    var resultTree = BinarySearchTree(0);
    var resultArray = [1, 2, 5, 3, 4, 6];
    for (var i = 0; i < resultArray.length; i++) {
      resultTree.insert(resultArray[i]);
    }

    resultTree = resultTree.rebalanceDSW();

    expect(resultTree.value).to.equal(3);
    expect(resultTree.left.value).to.equal(1);
    expect(resultTree.right.value).to.equal(5);
    expect(resultTree.left.left.value).to.equal(0);
    expect(resultTree.left.right.value).to.equal(2);
    expect(resultTree.right.left.value).to.equal(4);
    expect(resultTree.right.right.value).to.equal(6);
  });


});


