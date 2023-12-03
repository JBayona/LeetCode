/*
Given the head of a graph, return a deep copy (clone) of the graph. Each node in the graph
contains a label (int) and a list (List[UndirectedGraphNode]) of its neighbors. There is an edge
between the given node and each of the nodes in its neighbors.
OJ's undirected graph serialization (so you can understand error output):
Nodes are labeled uniquely.

We use # as a separator for each node, and , as a separator for node label and each neighbor of the node.

As an example, consider the serialized graph {0,1,2#1,2#2,2}.

The graph has a total of three nodes, and therefore contains three parts as separated by #.

First node is labeled as 0. Connect node 0 to both nodes 1 and 2.
Second node is labeled as 1. Connect node 1 to node 2.
Third node is labeled as 2. Connect node 2 to node 2 (itself), thus forming a self-cycle.
 
Visually, the graph looks like the following:

       1
      / \
     /   \
    0 --- 2
         / \
         \_/
Note: The information about the tree serialization is only meant so that you can understand error
output if you get a wrong answer. You don't need to understand the serialization to solve the problem.


https://leetcode.com/problems/clone-graph/

*/

var cloneGraph = function(node) {
    let map = {};
    return clone(node, map);  
};

function clone(node, map) {
    if (!node) {
        return null;
    }
    // Check if it has been stored previously
    if (node.val in map) {
        return map[node.val];
    }
    let clonedNode = new Node(node.val);
    map[clonedNode.val] = clonedNode;
    // Clone recursively its neighbors
    for (let n of node.neighbors) {
        clonedNode.neighbors.push(clone(n, map));
    }
    return clonedNode;
}

/**
 * Definition for undirected graph.
 * class UndirectedGraphNode {
 *     int label;
 *     List<UndirectedGraphNode> neighbors;
 *     UndirectedGraphNode(int x) { label = x; neighbors = new ArrayList<UndirectedGraphNode>(); }
 * };
 */
public class Solution {
    public UndirectedGraphNode cloneGraph(UndirectedGraphNode node) {
        Map<Integer, UndirectedGraphNode> map = new HashMap<>();
        return dfsClone(node, map);
    }
    
    public UndirectedGraphNode dfsClone(UndirectedGraphNode node, Map<Integer, UndirectedGraphNode> map) {
        if (node == null) return null;
        if (map.containsKey(node.label)) return map.get(node.label);
        UndirectedGraphNode cloneNode = new UndirectedGraphNode(node.label);
        map.put(cloneNode.label, cloneNode);
        for (UndirectedGraphNode n : node.neighbors) 
            cloneNode.neighbors.add(dfsClone(n, map));
        return cloneNode;
    }
}
