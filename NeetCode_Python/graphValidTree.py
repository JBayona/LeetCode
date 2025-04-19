"""
You have a graph of n nodes labeled from 0 to n - 1. You are given an integer n and a list
of edges where edges[i] = [ai, bi] indicates that there is an undirected edge between nodes ai and bi in the graph.

Return true if the edges of the given graph make up a valid tree, and false otherwise.

https://leetcode.com/problems/graph-valid-tree/description/
"""

# // Time O(V + E)
# // Space O(V + E)
class Solution:
    def validTree(self, n: int, edges: List[List[int]]) -> bool:
        parent = {}

        # Set all nodes to the same node
        for edge in edges:
            f, t = edge
            if f not in parent:
                parent[f] = f

            if t not in parent:
                parent[t] = t

        
        for edge in edges:
            f, t = edge
            parentA = self.findParent(f, parent)
            parentB = self.findParent(t, parent)

            if parentA == parentB:
                return False

            
            self.union(parentA, parentB, parent)
        
        return len(edges) == n - 1
    
    def findParent(self, node, parent):
        if parent[node] == node:
            return parent[node]
        return self.findParent(parent[node], parent)

    def union(self, nodeA, nodeB, parent):
        parent[nodeB] = nodeA
        
        