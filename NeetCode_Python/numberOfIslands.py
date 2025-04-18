"""
Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.
You may assume all four edges of the grid are all surrounded by water.

Example 1:
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1

Example 2:
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3

https://leetcode.com/problems/number-of-islands/description/
"""

# Time O(M * N)
# Space O(M * N)
class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:

        ROW = len(grid)
        COL = len(grid[0])

        visited = [[False for i in range(COL)] for _ in range(ROW)]
        count = 0
        for i in range(ROW):
            for j in range(COL):
                if grid[i][j] == "1" and visited[i][j] == False:
                    visited[i][j] = True
                    dfs(grid, visited, i, j)
                    count+=1

        return count

def dfs(grid, visited, row, col):
    rowK = [0, -1, 0, 1]
    colK = [-1, 0, 1, 0]

    for i in range(4):
        next_row = row + rowK[i]
        next_col = col + colK[i]
        if is_safe(grid, visited, next_row, next_col):
            visited[next_row][next_col] = True
            dfs(grid, visited, next_row, next_col)


def is_safe(grid, visited, row, col):
    ROW = len(grid)
    COL = len(grid[0])
    return (
        row >= 0 and row < ROW and
        col >= 0 and col < COL and
        grid[row][col] == "1" and
        visited[row][col] == False
    )
