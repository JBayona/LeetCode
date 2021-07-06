"""
In MATLAB, there is a handy function called reshape which can reshape an m x n matrix into a
new one with a different size r x c keeping its original data.

You are given an m x n matrix mat and two integers r and c representing the row number and
column number of the wanted reshaped matrix.

The reshaped matrix should be filled with all the elements of the original matrix in the same
row-traversing order as they were.

If the reshape operation with given parameters is possible and legal, output the new
reshaped matrix; Otherwise, output the original matrix.

https://leetcode.com/problems/reshape-the-matrix/
"""

class Solution(object):
    def matrixReshape(self, mat, r, c):
        """
        :type mat: List[List[int]]
        :type r: int
        :type c: int
        :rtype: List[List[int]]
        """
        row = len(mat)
        col = len(mat[0])
        
        if r * c != row * col:
            return mat
        
        result = []
        for i in range(0, r):
            result.append([0 for i in range(0, c)])
            
        print(result)
            
        x = 0
        y = 0
        for i in range(0, row):
            for j in range(0, col):
                result[x][y] = mat[i][j]
                y += 1
                if y == c:
                    x += 1
                    y = 0
        return result
        