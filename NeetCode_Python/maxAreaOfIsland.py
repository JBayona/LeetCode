"""
You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected
4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

The area of an island is the number of cells with a value 1 in the island.
Return the maximum area of an island in grid. If there is no island, return 0.

Example 1:
Input: grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
Output: 6
Explanation: The answer is not 11, because the island must be connected 4-directionally.

Example 2:
Input: grid = [[0,0,0,0,0,0,0,0]]
Output: 0

https://leetcode.com/problems/max-area-of-island/description/
"""

"""
Time O(M * N)
Space O(M * N)
"""
class Solution:
    def maxAreaOfIsland(self, grid: List[List[int]]) -> int:
        ROW = len(grid)
        COL = len(grid[0])

        visited = [[False for i in range(COL)] for _ in range(ROW)]
        
        result = 0
        for i in range(ROW):
            for j in range(COL):
                if grid[i][j] == 1 and not visited[i][j]:
                    visited[i][j] = True
                    result = max(result, dfs(grid, visited, i, j))

        return result

def dfs(grid, visited, row, col):
    rowK = [0, -1, 0, 1]
    colK = [-1, 0, 1, 0]

    count = 1
    
    for i in range(4):
        nextRow = row + rowK[i]
        nextCol = col + colK[i]
        if isSafe(grid, visited, nextRow, nextCol):
            visited[nextRow][nextCol] = True
            count += dfs(grid, visited, nextRow, nextCol)
    return count

def isSafe(grid, visited, row, col):
    ROW = len(grid)
    COL = len(grid[0])
    return (
        row >= 0 and row < ROW and
        col >= 0 and col < COL and
        grid[row][col] == 1 and
        visited[row][col] == False
    )
        