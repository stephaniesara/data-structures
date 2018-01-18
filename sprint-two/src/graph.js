

// Instantiate a new graph
var Graph = function() {
  this._nodes = {};
};

// Add a node to the graph, passing in the node's value.
Graph.prototype.addNode = function(node) {
  this._nodes[node] = new GraphNode();
};

// Return a boolean value indicating if the value passed to contains is represented in the graph.
Graph.prototype.contains = function(node) {
  return node in this._nodes;
};

// Removes a node from the graph.
Graph.prototype.removeNode = function(node) {
  for (let k in this._nodes) {
    if (node in this._nodes[k]._edges) {
      delete this._nodes[k]._edges[node];
    }
  }
  delete this._nodes[node];  
};

// Returns a boolean indicating whether two specified nodes are connected.  Pass in the values contained in each of the two nodes.
Graph.prototype.hasEdge = function(fromNode, toNode) {
  return toNode in this._nodes[fromNode]._edges;
};

// Connects two nodes in a graph by adding an edge between them.
Graph.prototype.addEdge = function(fromNode, toNode) {
  this._nodes[fromNode]._edges[toNode] = true;
  this._nodes[toNode]._edges[fromNode] = true;
};

// Remove an edge between any two specified (by value) nodes.
Graph.prototype.removeEdge = function(fromNode, toNode) {
  delete this._nodes[fromNode]._edges[toNode];
  delete this._nodes[toNode]._edges[fromNode];
};

// Pass in a callback which will be executed on each node of the graph.
Graph.prototype.forEachNode = function(cb) {
  for (let key in this._nodes) {
    cb(key);
  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 */

var GraphNode = function() {
  this._edges = {};
};
