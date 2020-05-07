/*
Median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value.
So the median is the mean of the two middle value.

Examples:
[2,3,4] , the median is 3

[2,3], the median is (2 + 3) / 2 = 2.5

Given an array nums, there is a sliding window of size k which is moving from the very left of the array
to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.
Your job is to output the median array for each window in the original array.

For example,
Given nums = [1,3,-1,-3,5,3,6,7], and k = 3.

Window position                Median
---------------               -----
[1  3  -1] -3  5  3  6  7       1
 1 [3  -1  -3] 5  3  6  7       -1
 1  3 [-1  -3  5] 3  6  7       -1
 1  3  -1 [-3  5  3] 6  7       3
 1  3  -1  -3 [5  3  6] 7       5
 1  3  -1  -3  5 [3  6  7]      6
Therefore, return the median sliding window as [1,-1,-1,3,5,6].

Note:
You may assume k is always valid, ie: k is always smaller than input array's size for non-empty array.
Answers within 10^-5 of the actual value will be accepted as correct.

https://leetcode.com/problems/sliding-window-median/
*/

/*
TC O(n lg K)
SC O(n-k+1)
*/
import java.util.*;
class Solution {
    public double[] medianSlidingWindow(int[] nums, int k) {
      
      // to keep track of lower value of median
      PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a,b)-> b<a?-1:1);
      // to keep track of the higher value of the median
      PriorityQueue<Integer> minHeap = new PriorityQueue<>();
      
      double[] result = new double[nums.length - k + 1];
      //add k-1 elements to heaps
      for(int i = 0; i < k-1; i++) {
          maxHeap.offer(nums[i]);
          minHeap.offer(maxHeap.poll());
          if(maxHeap.size() + 1 < minHeap.size()){
              maxHeap.offer(minHeap.poll());
          }
      }
      
      int index = 0;
      // now iterate over all the remaining elements and find the rolling median
      for(int i = k - 1; i < nums.length; i++) {
          
          // add ith element now
          maxHeap.offer(nums[i]);
          minHeap.offer(maxHeap.poll());
          if(maxHeap.size() + 1 < minHeap.size()){
              maxHeap.offer(minHeap.poll());
          }
          
          // get the median
          if (k % 2 == 0){
              result[index]=((double)maxHeap.peek() + (double) minHeap.peek() )/2.0;
          } else {
              result[index]=minHeap.peek();
          }
          
          // remove the left side j element
          if(minHeap.contains(nums[index]))
              minHeap.remove(nums[index]);
          else
              maxHeap.remove(nums[index]);
          
          index++;
      }
      return result;
  }
}