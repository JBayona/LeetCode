/*
There are a total of n courses you have to take, labeled from 0 to n-1.
Some courses may have prerequisites, for example to take course 0 you have to
first take course 1, which is expressed as a pair: [0,1]

Given the total number of courses and a list of prerequisite pairs, return
the ordering of courses you should take to finish all courses.

There may be multiple correct orders, you just need to return one of
them. If it is impossible to finish all courses, return an empty array.

Example 1:
Input: 2, [[1,0]] 
Output: [0,1]
Explanation: There are a total of 2 courses to take. To take course 1 you should have finished   
             course 0. So the correct course order is [0,1] .

Example 2:
Input: 4, [[1,0],[2,0],[3,1],[3,2]]
Output: [0,1,2,3] or [0,2,1,3]
Explanation: There are a total of 4 courses to take. To take course 3 you should have finished both     
             courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0. 
             So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3] .
Note:

The input prerequisites is a graph represented by a list of edges, not adjacency matrices. Read more about how a graph is represented.
You may assume that there are no duplicate edges in the input prerequisites.

https://leetcode.com/problems/course-schedule-ii/
*/
// Time O(V+E) where V is the number of vertices and E is the number of edges in the graph.
// Space O(V+E) where V is the number of vertices and E is the number of edges in the graph.
// Directed Graph
var findOrder = function(numCourses, prerequisites) {
    let graph = {};
    // Create graph
    for(let i = 0; i < numCourses; i++) {
        graph[i] = [];
    }

    // Fill directed graph
    for (let prereq of prerequisites) {
        let [from, to] = prereq;
        graph[from].push(to);
    }

    result = [];
    // states:
    // 0 - no visited
    // 1 = visited but not processed (viisted in current DFS)
    // 2 = processed
    let states = new Array(numCourses).fill(0);
    
    for(let i = 0; i < numCourses; i++) {
        // Check that there is no cycle
        // If there's a cycle, just return empty array
        if(dfsHasCycle(graph, i, states)) {
            return []
        }
    }
    // At this point there's no cycle
    return result;

};

function dfsHasCycle(graph, node, states){
    // It will be a cycle is it's different than 2
    if (states[node] > 0) {
        return states[node] !== 2;
    }

    // Processing in current dfs
    states[node] = 1;
    for (let neighbor of graph[node]) {
        // Has a cycle
        if(dfsHasCycle(graph, neighbor, states)) {
            return true;
        }
    }
    // Processed
    states[node] = 2;
    // Add to the result
    // This result is required to course[1] should be before course[0]
    // If we want to have the opposite we just need to reverse the
    // order of how do we insert the elements in the result, so
    // it should be result.unshift(node) if we want to happen first
    // course[0] than course[1]
    result.push(node);
    return false;
}
