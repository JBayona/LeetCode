"""
In this problem, a tree is an undirected graph that is connected and has no cycles.

You are given a graph that started as a tree with n nodes labeled from 1 to n, with one additional edge added.
The added edge has two different vertices chosen from 1 to n, and was not an edge that already existed.
The graph is represented as an array edges of length n where edges[i] = [ai, bi] indicates that there is an edge
between nodes ai and bi in the graph.

Return an edge that can be removed so that the resulting graph is a tree of n nodes. If there are multiple answers
return the answer that occurs last in the input.

https://leetcode.com/problems/redundant-connection/description/
"""

# // Time O(V + E)
# // Space O(V + E)
class Solution:
    def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:
        parent = {}
        for edge in edges:
            fromNode, toNode = edge
            if fromNode not in parent:
                parent[fromNode] = fromNode
            if toNode not in parent:
                parent[toNode] = toNode
        
        for edge in edges:
            fromNode, toNode = edge
            parentA = self.findParent(fromNode, parent)
            parentB = self.findParent(toNode, parent)

            if parentA == parentB:
                return [fromNode, toNode]
            
            # Union
            self.union(parentA, parentB, parent)
        
        return []
    
    def findParent(self, node, parent):
        if parent[node] == node:
            return node
        return self.findParent(parent[node], parent)
        
    def union(self, parentA, parentB, parent):
        parent[parentB] = parentA