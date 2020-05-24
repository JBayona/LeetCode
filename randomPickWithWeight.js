/*
Given an array w of positive integers, where w[i] describes the weight of index i, write a
function pickIndex which randomly picks an index in proportion to its weight.

Note:

1 <= w.length <= 10000
1 <= w[i] <= 10^5
pickIndex will be called at most 10000 times.
Example 1:

Input: 
["Solution","pickIndex"]
[[[1]],[]]
Output: [null,0]
Example 2:

Input: 
["Solution","pickIndex","pickIndex","pickIndex","pickIndex","pickIndex"]
[[[1,3]],[],[],[],[],[]]
Output: [null,0,1,1,1,0]
Explanation of Input Syntax:

The input is two lists: the subroutines called and their arguments. Solution's constructor
has one argument, the array w. pickIndex has no arguments. Arguments are always wrapped with a
list, even if there aren't any.

https://leetcode.com/problems/random-pick-with-weight/
*/

class Solution {
  private int[] sum;
  public Solution(int[] w) {
    sum = new int[w.length];
    // Prefix sum
    for (int i = 0; i < w.length; i++) {
        sum[i] = i == 0? w[i]: sum[i-1] + w[i];
    }
  }
  
  public int pickIndex() {
    // Generate a random number from 1 to prefix num
    // Example: [1,4] = Random from 1 to 4
    int random = (int)(Math.random() * (sum[sum.length-1])) + 1;
    System.out.println(random);
    int low = 0, high = sum.length-1;
    while (low < high) {
      int mid = (low + high) / 2;
      if(sum[mid] == random) return mid;
      if(sum[mid] < random) {
          low = mid+1;
      }else if(sum[mid] > random){
          high = mid;
      }
    }
    return low;
  }
}