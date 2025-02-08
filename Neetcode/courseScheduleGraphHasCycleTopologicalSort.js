/*
There are a total of numCourses courses you have to take, labeled from
0 to numCourses - 1. You are given an array prerequisites where
prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
Return true if you can finish all courses. Otherwise, return false.

Example 1:
Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0. So it is possible.

Example 2:
Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false

Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0, and to take course 0 you should also
have finished course 1. So it is impossible.

https://leetcode.com/problems/course-schedule/
*/

// Time O(V+E) where VV is the number of vertices and EE is the number of edges in the graph.
// Space O(V+E) where VV is the number of vertices and EE is the number of edges in the graph.
// Directed Graph
var canFinish = function(numCourses, prerequisites) {
    let graph = [];
    // Create graph
    for (let i = 0; i < numCourses; i++) {
      graph[i] = [];
    }

    for (let i = 0; i < prerequisites.length; i++) {
      let [from, to] = prerequisites[i];
      graph[from].push(to);
    }

    // 0 - unvisited
    // 1 - processing
    // 2 - visited
    let states = new Array(numCourses).fill(0);
    for (let i = 0; i < numCourses; i++) {
        // If there's a cycle on the graph
        if (hasCycle(i, graph, states)) {
            return false;
        }
    }
    // All the graph is connected and there is no cycle at this point
    return true;
};

function hasCycle(node, graph, states) {
    // This will give true if the node has a cycle
    if (states[node] > 0) {
        return states[node] !== 2;
    }
  // Mark as processing
  states[node] = 1;
  for (let neighbor of graph[node]) {
    if (hasCycle(neighbor, graph, states)) {
        return true;
    }
  }
  // Mark as processed
  states[node] = 2;
  return false;
}
