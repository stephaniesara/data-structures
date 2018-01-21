var TrieTree = function() {
  this._children = {};
  this.freq = Infinity;
};

/**
 * Insert a string in the trie
 * @param  {String} str string to be inserted
 * @return {undefined}     
 */
TrieTree.prototype.insert = function(str, freq) {
  if (str === null || str === '') {
    return;
  }
  let prefix = str[0];
  let rest = str.slice(1);
  if (!(prefix in this._children)) {
    this._children[prefix] = new TrieTree();
  }
  if (rest !== '') {
    this._children[prefix].insert(rest, freq);
  } else {
    (freq !== undefined) && (this._children[prefix].freq = freq);
  }
  return;
};

TrieTree.prototype.getStrings = function(prefix) {
  let suffixes = [];
  let suffix = [];
  var getAllSuffixes = function(n) {
    if (Object.keys(n._children).length !== 0) {
      for (k in n._children) {
        suffix.push([k, n._children[k]]);
        getAllSuffixes(n._children[k]);
        let word = [suffix.map(x => x[0]).join(''), (suffix[suffix.length - 1][1]).freq];
        suffixes.push(word);
        suffix.pop();
      }
    }
    return;
  };

  // walk the prefix tree to find the first node not in the prefix
  let node = this;
  for (let i = 0; i < prefix.length; ++i) {
    node = node._children[prefix[i]];
    if (node === undefined) {
      return [];
    }
  }
  // return all strings
  getAllSuffixes(node);
  suffixes.push(['', node.freq]);
  let result = suffixes.reverse().map(s => [prefix + s[0], s[1]]);
  return result;
};


/**
 * Returns true if string is in the tree, false otherwise
 * @param  {String} str [string to search for]
 * @return {Boolean}     
 */
TrieTree.prototype.contains = function(str) {
  if (str === null || str === '') {
    return false;
  }
  let isContained = true;
  let c = str[0];
  let rest = str.slice(1);
  if (c in this._children) {
    if (rest !== '') {
      isContained = isContained && this._children[c].contains(rest);
    }
  } else {
    return false;
  }
  return isContained;
};

/**
 * Returns a list of words, ordered by frequency that have a prefix given 
 * by the numeric prefix following the T9 conversion from digits to letters
 * @param {String} prefix string of digits 
 */
var T9 = function(prefix) {
  var addLetter = function(target, source) {
    let resArr = [];
    if (target.length === 0) {
      resArr = source.slice(0);
    } else {
      for (let i = 0; i < source.length; ++i) {
        resArr = target.reduce(function(acc, ele) {
          acc.push(ele + source[i]);
          return acc;
        }, resArr);
      }
    }
    return resArr;
  };

  var compareWords = function(w1, w2) {
    if (w1[1] < w2[1]) {
      return -1;
    }
    if (w1[1] > w2[1]) {
      return 1;
    }
    return 0;
  };

  // let dictionary = ['the', 'dog', 'test', 'another', 'word', 'theocrathy', 'th', 'view', 'random'];
  let frequency = dictionary.map((x, idx) => [x, idx]);

  let t9Alphabet = [undefined, undefined, ['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i'],
    ['j', 'k', 'l'], ['m', 'n', 'o'], ['p', 'q', 'r', 's'], ['t', 'u', 'v'], ['w', 'x', 'y', 'z']];
  let words = [];
  let searchFor = [];
  for (let i = 0; i < prefix.length; ++i) {
    searchFor = addLetter(searchFor, t9Alphabet[prefix[i]]);
  }

  let tree = new TrieTree();
  frequency.forEach(x => tree.insert(x[0], x[1]));

  let result = [];
  result = searchFor.reduce(function(acc, ele) {
    acc = acc.concat(tree.getStrings(ele));
    return acc;
  }, result);
  
  result = result.filter(x => x[1] !== Infinity).sort(compareWords);// ordered by frequency 

  return result;
};