/*
Given a set of N people (numbered 1, 2, ..., N), we would like to split everyone into two groups of any size.

Each person may dislike some other people, and they should not go into the same group. 

Formally, if dislikes[i] = [a, b], it means it is not allowed to put the people numbered a and b into the same group.

Return true if and only if it is possible to split everyone into two groups in this way.

Example 1:

Input: N = 4, dislikes = [[1,2],[1,3],[2,4]]
Output: true
Explanation: group1 [1,4], group2 [2,3]
Example 2:

Input: N = 3, dislikes = [[1,2],[1,3],[2,3]]
Output: false
Example 3:

Input: N = 5, dislikes = [[1,2],[2,3],[3,4],[4,5],[1,5]]
Output: false

https://leetcode.com/problems/possible-bipartition/
*/

// DFS
// Time complexity: O(V+E)
// Space complexity: O(V)
var possibleBipartition = function(N, dislikes) {
    let graph = new Array(N);
    for(let i = 0; i < graph.length; i++) {
        graph[i] = [];
    }
    
    // Fill undirected graph
    for(let d of dislikes) {
        // Zero index
        let a = d[0] - 1;
        let b = d[1] - 1;
        graph[a].push(b);
        graph[b].push(a);
    }
    // 0 unvisited, 1 group A, -1 group B
    let colors = new Array(N).fill(0);
    for(let i = 0; i < N; i++) {
        if(colors[i] === 0 && !dfs(graph, colors, i, 1)) {
            return false;
        }
    }
    return true;
};

function dfs(graph, colors, node, color) {
    // If the color is the same as the other group
    // This means we can not do a bipartition in our graph
    if(colors[node] === -color) {
        return false
    }
    // Node has been visited
    if(colors[node] !== 0) {
        return true;
    }
    // Mark as visited
    colors[node] = color;
    for(let i = 0; i < graph[node].length; i++) {
        let nextNode = graph[node][i];
        if(!dfs(graph, colors, nextNode, -color)) {
            return false;
        }
    }
    return true;
}

// BFS
// Time complexity: O(V+E)
// Space complexity: O(V)
var possibleBipartition = function(N, dislikes) {
    let graph = new Array(N);
    for(let i = 0; i < graph.length; i++) {
        graph[i] = [];
    }
    
    // Fill undirected graph
    for(let d of dislikes) {
        // Zero index
        let a = d[0] - 1;
        let b = d[1] - 1;
        graph[a].push(b);
        graph[b].push(a);
    }
    // 0 unvisited, 1 group A, -1 group B
    let colors = new Array(N).fill(0);
    
    let queue = [];
    
    for(let i = 0; i < N; i++) {
        // Unvisited nodes
        if(colors[i] === 0) {
            queue.push(i);
            // Mark as visited
            colors[i] = 1;
            
            while(queue.length) {
                let node = queue.shift();
                let nextColor = -colors[node];
                // Look for the connections of the node
                for(let i = 0; i < graph[node].length; i++) {
                    let nextNode = graph[node][i];
                    // Check if it's not visited
                    if(colors[nextNode] === 0) {
                        queue.push(nextNode);
                        // Mark as visited
                        colors[nextNode] = nextColor;
                    } else if(colors[node] === colors[nextNode]) {
                        // If we have the same color as the prev node, it means
                        // it's not a bipartite graph
                        return false;
                    }
                }
            }
        }
    }
    return true;
};