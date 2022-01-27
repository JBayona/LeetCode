/*
Given a directed acyclic graph (DAG) of n nodes labeled from 0 to n - 1, find all
possible paths from node 0 to node n - 1, and return them in any order.

The graph is given as follows: graph[i] is a list of all nodes you can visit from
node i (i.e., there is a directed edge from node i to node graph[i][j]).

https://leetcode.com/problems/all-paths-from-source-to-target/
*/

// Time O(N)
// Space O(N)
var allPathsSourceTarget = function(graph) {
    let result = [];
    dfs(graph, 0, [], result);
    return result;
};

function dfs(graph, current, tmp, result) {
    tmp.push(current);
    if(current == graph.length - 1) {
        // Create a new reference
        result.push(tmp.concat());
        return;
    }
    for(let i = 0; i < graph[current].length; i++) {
        let child = graph[current][i];
        dfs(graph, child, tmp, result);
        tmp.pop();
    }
}

// BFS
var allPathsSourceTarget = function(graph) {
    let queue = [];
    let result = [];
    // Init node
    queue.push([0]);
    while(queue.length) {
        let path = queue.shift();
        let node = path[path.length - 1];
        if(node == graph.length-1) {
            result.push(path)
        } else {
            for(let neighbor of graph[node]) {
                queue.push([...path, neighbor]);
            }
        }
    }
    return result;
};