"""
There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the
island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.

The island is partitioned into a grid of square cells. You are given an m x n integer matrix heights
where heights[r][c] represents the height above sea level of the cell at coordinate (r, c).

The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and
west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell
adjacent to an ocean into the ocean.

Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow
from cell (ri, ci) to both the Pacific and Atlantic oceans.

https://leetcode.com/problems/pacific-atlantic-water-flow/description/
"""

# // Instead of figuring out which cells can flow water to ocean, let's look at the problem
# // as figuring out cells where water may reach from both oceans.
# // Of course, we need to reverse the height check i.e. water can flow from a cell with
# // height h to another neighbor cell with height >= h.

# // Cells directly connected to Pacific ocean are first row and first column so they
# // become our start cells. We can do a DFS/BFS
# // from these start cells to figure out all the reachable cells. Atlantic ocean is
# // similar - we just need to treat last row and last column as start cells.

# // Finally, we iterate over all the cells and add the ones that were visited by both
# // traversals to the result.
# // Time O(M * n)
class Solution:
    def pacificAtlantic(self, grid: List[List[int]]) -> List[List[int]]:
        ROW = len(grid)
        COL = len(grid[0])

        pacific = [[False for i in range(COL)] for _ in range(ROW)]
        atlantic = [[False for i in range(COL)] for _ in range(ROW)]

        # Traverse Pacific and Atlantic vertical axis
        for i in range(ROW):
            self.dfs(grid, pacific, i, 0)
            self.dfs(grid, atlantic, i, COL - 1)

        # Traverse Pacific and Atlantic horizontal axis
        for i in range(COL):
            self.dfs(grid, pacific, 0, i)
            self.dfs(grid, atlantic, ROW - 1, i)

        result = []
        # If both are True that means they can flow
        for i in range(ROW):
            for j in range(COL):
                if pacific[i][j] == True and atlantic[i][j] == True:
                    result.append([i, j])
        
        return result


    def dfs(self, grid, visited, row, col):
        # Mark the first as visited
        visited[row][col] = True

        rowK = [0, -1, 0, 1]
        colK = [-1, 0, 1, 0]

        for i in range(4):
            nextRow = row + rowK[i]
            nextCol = col + colK[i]
            if self.isSafe(grid, visited, nextRow, nextCol) and grid[row][col] <= grid[nextRow][nextCol]:
                visited[nextRow][nextCol] = True
                self.dfs(grid, visited, nextRow, nextCol)
    
    def isSafe(self, grid, visited, row, col):
        ROW = len(grid)
        COL = len(grid[0])
        return (
            row >= 0 and row < ROW and
            col >= 0 and col < COL and
            visited[row][col] == False
        )
