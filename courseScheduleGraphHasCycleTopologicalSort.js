/*
There are a total of numCourses courses you have to take, labeled from 0 to numCourses-1.

Some courses may have prerequisites, for example to take course 0 you have to first take course 1, which is expressed as a pair: [0,1]

Given the total number of courses and a list of prerequisite pairs, is it possible for you to finish all courses?

 

Example 1:

Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: There are a total of 2 courses to take. 
             To take course 1 you should have finished course 0. So it is possible.
Example 2:

Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Explanation: There are a total of 2 courses to take. 
             To take course 1 you should have finished course 0, and to take course 0 you should
             also have finished course 1. So it is impossible.
 

Constraints:

The input prerequisites is a graph represented by a list of edges, not adjacency matrices. Read more about how a graph is represented.
You may assume that there are no duplicate edges in the input prerequisites.
1 <= numCourses <= 10^5

https://leetcode.com/problems/course-schedule/
*/

var canFinish = function(numCourses, prerequisites) {
    let graph = [];
    // Create graph
    for(let i = 0; i < numCourses; i++) {
        graph[i] = [];
    }

    // Fill directed graph
    for(let i = 0; i < prerequisites.length; i++) {
        let node = prerequisites[i];
        let from = node[0];
        let to = node[1];
        graph[from].push(to);
    }
    
    console.log(graph);
    return !containsCycle(graph, numCourses);
};

function containsCycle(graph, numCourses) {
    // states:
    // 0 - no visited
    // 1 = visited but not processed
    // 2 = processed
    let states = new Array(numCourses).fill(0);
    for(let i = 0; i < numCourses; i++) {
        if(states[i] === 0) {
            // Check that there is no cycle
            if(dfsHasCycle(graph, i, states)) {
                return true;
            }
        }
    }
    
    // All the graph is connected and there is no cycle at this point
    return false;
}

// Has cycle
function dfsHasCycle(graph, node, states) {
    
    let neighbors = graph[node];

    // Processing
    states[node] = 1;

    for(let i = 0; i < neighbors.length; i++) {
        let vertex = neighbors[i];
        if(states[vertex] === 0) {
            if(dfsHasCycle(graph, vertex, states)) {
                return true;
            }
        }
        if(states[vertex] === 1) {
            return true;
        }
    }
    // Processed
    states[node] = 2;
    return false;
}