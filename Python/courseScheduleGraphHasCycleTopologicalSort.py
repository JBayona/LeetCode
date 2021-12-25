"""
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
"""

class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        
        # Create a graph
        graph = [[] for i in range(numCourses)]
        
        print(graph)
        
        # Fill graph details
        for f,t in prerequisites:
            graph[f].append(t)
            
        states = [0 for i in range(numCourses)]
        # states:
        # 0 - no visited
        # 1 = visited but not processed
        # 2 = processed
        for node in range(numCourses):
            # IF the node has not been processed
            if states[node] == 0:
                # Check if the graph is connected and there's no cycle
                if self.dfsHasCycle(node, graph, states):
                    return False
        
        # The graph is connected and there's no cycle
        return True
    
    def dfsHasCycle(self, node, graph, states):
        # Mark the node as processing
        states[node] = 1
        
        # Check all of the nodes
        for vertex in graph[node]:
            if states[vertex] == 0:
                # Check if the node has a cycle
                if self.dfsHasCycle(vertex, graph, states):
                    return True
            if states[vertex] == 1:
                return True
            
        # Mark the node es visited
        states[node] = 2