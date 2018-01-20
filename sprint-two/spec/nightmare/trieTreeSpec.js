describe('trieTree', function() {
  var tTree;

  beforeEach(function() {
    tTree = new TrieTree();
  });

  it('should have methods named "insert", "contains", and "getStrings', function() {
    expect(tTree.insert).to.be.a('function');
    expect(tTree.contains).to.be.a('function');
    expect(tTree.getStrings).to.be.a('function');
  });

  it('should insert values at the correct location in the tree', function() {
    tTree.insert('azz');
    expect(tTree._children['a']._children['z']._children['z']._children).to.eql({});
  });

  it('should have a working "contains" method', function() {
    tTree.insert('abcdefg');
    expect(tTree.contains('abcdefg')).to.equal(true);
    expect(tTree.contains('atz')).to.equal(false);
  });

  it('should have a working "getStrings" method', function() {
    tTree.insert('abcdefg');
    tTree.insert('atz');
    expect(tTree.getStrings('abc')).to.eql([['abc', Infinity], ['abcd', Infinity], ['abcde', Infinity], ['abcdef', Infinity], ['abcdefg', Infinity]]);
  });

  it('should return no words if prefix not in tree', function() {
    tTree.insert('abcdefg');
    tTree.insert('atz');
    expect(tTree.getStrings('bbb')).to.eql([]);
  });

  it('should return words for code 843', function() {
    let res = T9('843');
    expect(T9('843').slice(0, 5)).to.eql([['the', 0], ['they', 50], ['their', 57], ['there', 62], ['view', 78]]);
  });
});