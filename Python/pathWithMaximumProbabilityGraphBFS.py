"""
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
"""


class Solution:
    def maxProbability(self, n: int, edges: List[List[int]], succProb: List[float], start: int, end: int) -> float:
        graph = [[] for _ in range(n)]
        # Form undirected graph
        # from index to destinty, we have success of prob
        for i, edges in enumerate(edges):
            u, v = edges
            graph[u].append((v, succProb[i]))
            graph[v].append((u, succProb[i]))

        """
        [ [ 1, 0.5 ], [ 2, 0.2 ] ],
        [ [ 0, 0.5 ], [ 2, 0.5 ] ],
        [ [ 1, 0.5 ], [ 0, 0.2 ] ]
        ]"""

        prob = [0.0] * n
        queue = deque([start])
        # Prob from start to start = 1
        prob[start] = 1

        # BFS
        while queue:
            # Index from where we are coming
            index = queue.popleft()
            # Look for the connections fo the node
            for node, p in graph[index]:
                # Update the probability from reaching index to j if it´s greater
                if prob[index] * p > prob[node]:
                    queue.append(node)
                    prob[node] = prob[index] * p

        return prob[end]
