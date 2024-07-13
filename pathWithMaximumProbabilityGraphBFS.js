/*
You are given an undirected weighted graph of n nodes (0-indexed), represented by an edge list
where edges[i] = [a, b] is an undirected edge connecting the nodes a and b with a probability of
success of traversing that edge succProb[i].

Given two nodes start and end, find the path with the maximum probability of success to go from
start to end and return its success probability.

If there is no path from start to end, return 0. Your answer will be accepted if it differs from
the correct answer by at most 1e-5. 
Example 1:
Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start = 0, end = 2
Output: 0.25000
Explanation: There are two paths from start to end, one having a probability of success = 0.2 and
the other has 0.5 * 0.5 = 0.25.

https://leetcode.com/problems/path-with-maximum-probability/
*/
var maxProbability = function(n, edges, succProb, start, end) {
    let graph = new Array(n);
    for(let i = 0; i < graph.length; i++) {
        graph[i] = [];
    }    
    // Form undirected graph
    // from index to destinty, we have success of prob
    for(let i = 0; i < edges.length; i++) {
        let [a, b] = edges[i];
        graph[a].push([b, succProb[i]]);
        graph[b].push([a, succProb[i]]);
    }
    
    console.log(graph);
    /* [
        [ [ 1, 0.5 ], [ 2, 0.2 ] ],
        [ [ 0, 0.5 ], [ 2, 0.5 ] ],
        [ [ 1, 0.5 ], [ 0, 0.2 ] ]
    ] */
    
    let prob = new Array(n).fill(0);
    let queue = [start];
    // Prob from start to start = 1
    prob[start] = 1;
    
    // BFS
    while(queue.length) {
        let size = queue.length;
        for(let i = 0; i < size; i++) {
            // Index from where we are coming
            let index = queue.shift();
            // Look for the connections fo the node
            for(let [j, p] of graph[index]) {
                // Update the probability from reaching index to j if it´s greater
                if(prob[index] * p > prob[j]) {
                    queue.push(j);
                    prob[j] = prob[index] * p;
                }
            }
        }
    }
    return prob[end];
};


// Time O( V + E)
var maxProbability = function(n, edges, succProb, start, end) {
    let graph = [];
    // Initialize the array
    for (let i = 0; i < n; i++) {
        graph[i] = [];
    }

    for (let i = 0; i < edges.length; i++) {
        let edge = edges[i];
        let [from, to] = edge;
        graph[from].push([to, succProb[i]]);
        graph[to].push([from, succProb[i]]);
    }
    
    let prob = new Array(n).fill(0);
    let visited = new Array(n).fill(false);

    prob[start] = 1;
    dfs(start, graph, prob, visited);

    return prob[end];
};

function dfs(node,graph, prob, visited) {
    // If visited
    if (visited[node]) {
        return;
    }

    visited[node] = true;

    for (let [next, p] of graph[node]) {
        if (prob[node] * p > prob[next]) {
            prob[next] = prob[node] * p;
        }
        dfs(next, graph, prob, visited);
    }
}
