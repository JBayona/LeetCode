"""
You have a graph of n nodes. You are given an integer n and an array edges where edges[i] = [ai, bi]
indicates that there is an edge between ai and bi in the graph.

Return the number of connected components in the graph.

https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/description/
"""

# // Time O(V + E)
# // Space O(V + E)
class Solution:
    def countComponents(self, n: int, edges: List[List[int]]) -> int:
        parent = {}
        # Set parent to itself
        for edge in edges:
            f, to = edge
            if f not in parent:
                parent[f] = f
            if to not in parent:
                parent[to] = to
        
        # Union Find
        connectedComponents = n
        for edge in edges:
            f, to = edge
            parentA = self.findParent(f, parent)
            parentB = self.findParent(to, parent)

            if parentA != parentB:
                connectedComponents -=1
                self.union(parentA, parentB, parent)
        
        return connectedComponents

    def findParent(self, node, parent):
        if parent[node] == node:
            return node
        return self.findParent(parent[node], parent)
    
    def union(self, parentA, parentB, parent):
        parent[parentB] = parentA
        