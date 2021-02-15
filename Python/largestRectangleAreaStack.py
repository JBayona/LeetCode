"""
Given n non-negative integers representing the histogram's bar height where the
width of each bar is 1, find the area of largest rectangle in the histogram.

Above is a histogram where width of each bar is 1, given height = [2,1,5,6,2,3].

The largest rectangle is shown in the shaded area, which has area = 10 unit.

Example:

Input: [2,1,5,6,2,3]
Output: 10

Example 1:
Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: The above is a histogram where width of each bar is 1.
The largest rectangle is shown in the red area, which has an area = 10 units.

Example 2:
Input: heights = [2,4]
Output: 4
 
Constraints:

1 <= heights.length <= 105
0 <= heights[i] <= 104

https://leetcode.com/problems/largest-rectangle-in-histogram/
https://www.youtube.com/watch?v=zx5Sw9130L0
"""

## Time O(N)
## Space O(N)
class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        max_area = 0
        stack = []
        
        for i, h in enumerate(heights):
            start = i
            ## We can not extend any further to the left as the current element 
            ## is greater than the last hegith seen, so let´s calculate the
            ## max area at that point
            while stack and stack[-1][1] > h:
                index, height = stack.pop()
                ## We consider the start the last index we seen as we
                ## can extend backwards
                max_area = max(max_area, height * (i - index))
                start = index
            stack.append((start, h))
            
        ## At this point we might have elements in the stack, this means
        ## that we could extend from the last element of the height all the
        ## way down
        for i, h in stack:
            max_area = max(max_area, h * (len(heights) - i))

        return max_area