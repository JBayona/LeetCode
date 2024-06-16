/*
We are given a binary tree (with root node root), a target node
and an integer value K.

Return a list of the values of all nodes that have a distance K from the target node.
The answer can be returned in any order.

Example 1:
Input: root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, K = 2
Output: [7,4,1]

Explanation: 
The nodes that are a distance 2 from the target node (with value 5)
have values 7, 4, and 1.

Note that the inputs "root" and "target" are actually TreeNodes.
The descriptions of the inputs above are just serializations of these objects.

https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/
*/

// Time O(N)
// Space O(N)
var distanceK = function(root, target, K) {
    let graph = {};
    // Create graph
    createGraph(root, null, graph);
    
    /* {
          '0': [ 1 ],
          '1': [ 0, 8, 3 ],
          '2': [ 7, 4, 5 ],
          '3': [ 5, 1 ],
          '4': [ 2 ],
          '5': [ 6, 2, 3 ],
          '6': [ 5 ],
          '7': [ 2 ],
          '8': [ 1 ]
        }
    */
    // console.log(graph);
    
    let queue = [];
    queue.push([target.val, 0]);
    let visited = new Set();
    let result = [];
    
    // BFS
    while(queue.length) {
        let [node, distance] = queue.shift();
        // No repeated nodes
        if(visited.has(node)) {
            continue;
        }
        if(distance === K) {
            result.push(node);
        }
        // Early break
        if(distance > K) {
            return result;
        }
        
        for(let n of graph[node]) {
            queue.push([n, distance + 1]);
        }
        // Mark node as visited
        visited.add(node);
    }
    return result;
};

function createGraph(node, parent, graph) {
    if(!node) {
        return;
    }
    const neighbor = [];
    if(node.left) {
        neighbor.push(node.left.val);
        createGraph(node.left, node.val, graph);
    }
    if(node.right) {
        neighbor.push(node.right.val);
        createGraph(node.right, node.val, graph);
    }
    if(parent !== null) {
        neighbor.push(parent);
    }
    graph[node.val] = neighbor;
}
