"""
Given n non-negative integers a1, a2, ..., an , where each represents a point at
coordinate (i, ai). n vertical lines are drawn such that the two endpoints of the line i is
at (i, ai) and (i, 0). Find two lines, which, together with the x-axis forms a container, such that the
container contains the most water.

Notice that you may not slant the container.

https://leetcode.com/problems/container-with-most-water/
"""
# Two pointers
# Time O(N)
# Space O(1)
def maxArea(self, height: List[int]) -> int:
    maxValue = 0
    i = 0
    j = len(height) - 1
    h = 0
    width = 1
    
    while i < j:
        width = j - i
        h = min(height[i], height[j])
        maxValue = max(maxValue, h * width)
        if height[i] > height[j]:
            j-=1
        else:
            i+=1
    return maxValue