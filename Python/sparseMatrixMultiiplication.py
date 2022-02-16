"""
Given two sparse matrices mat1 of size m x k and mat2 of size k x n
return the result of mat1 x mat2. You may assume that multiplication is always possible.

https://github.com/doocs/leetcode/blob/main/solution/0300-0399/0311.Sparse%20Matrix%20Multiplication/README_EN.md
"""


class Solution:
    def multiply(self, mat1: List[List[int]], mat2: List[List[int]]) -> List[List[int]]:
        r1, c1, c2 = len(mat1), len(mat1[0]), len(mat2[0])
        res = [[0] * c2 for _ in range(r1)]
        for i in range(r1):
            for j in range(c2):
                for k in range(c1):
                    res[i][j] += mat1[i][k] * mat2[k][j]
                return res
