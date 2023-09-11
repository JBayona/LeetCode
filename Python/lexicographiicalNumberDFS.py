# Go deep for each level and try to get all numbers without breaking the limit
# For example for 1390, desired output is 1, 10, 100, 1000, 1001, 1002
# ..., 1009, 101, 1010, 1011, 1012,..., 1019, 102, 1020, 1021, 1022...,1029,
# 103, 1030, 1031, ... 1039, 104, 1040, ...
# Start from 1
# Go deep to 10
# Go deep to 100
# Go deep to 1000
# Go deep to 10000 (It´s greater than n, discard)
# Add 1001 to 1009 (Can´t go deeper than 1009)
# Go up 101
# Go deep 1010
# Go deep 10100 (It's greater than n, discard)
# Add 1011 to 1019
# Go up 102
# Go deep 1020
# ...
# Time O(N)
# Time O(1)
class Solution:
    def lexicalOrder(self, n: int) -> List[int]:
        arr = []
        # This will iterate from 1 to 9
        for i in range(1, 10):
            # Make sure numbers are smaller than our n
            if i <= n:
                arr.append(i)
                self.dfs(i, arr, n)
        return arr

    def dfs(self, indexBase: int, arr: List[int], n: int) -> None:
        # Base Case
        if indexBase * 10 > n:
            return

        # Iterate from indexBase * 10 to (indexBase * 10) + 9
        for i in range(indexBase * 10, (indexBase * 10) + 10):
            if i <= n:
                arr.append(i)
                self.dfs(i, arr, n)
