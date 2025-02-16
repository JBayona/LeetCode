/*
Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers.

If such arrangement is not possible, it must rearrange it as the lowest possible order (ie, sorted in ascending order).

The replacement must be in-place, do not allocate extra memory.

Here are some examples. Inputs are in the left-hand column and its corresponding outputs are in the right-hand column.
1,2,3 → 1,3,2
3,2,1 → 1,2,3
1,1,5 → 1,5,1

https://leetcode.com/problems/next-permutation/description/
*/

// Time O(n)
/*
the key to this problem is to realize that the next permutation is to
find the first decreasing pattern backwards (because the next permutation
needs to be the smallest number that's larger than the current number).
i.e. 154231 -> 154312 the first decreasing pattern is from 3 to 2

so the next question is which one we should pick to promote to the more
significant digit. to satify the definition of the next permutation, we need
to pick the smallest number that is larger than the one on the digit we are
trying to promote a new number to. so in the above example, the digit we are
trying to promote to is index 3(0 from left). so we need to find the smallest
number on the right side of this digit that is larger than it (we can use the
binary search here as we know the right side is in ascending order, this is
because we stop at the first decreasing pattern. but this will not change the
overall time complexity). so in my solution, i just loop through from the back
and take the first one that's larger.

once we swap the two, just reverse the array from promotion digit + 1 to the end
in this case, from 4 to 5

the corner case where is the last permutation, we will know that by realizing
that the number is perfectly ordered ascending from back to front, so
we can just reverse.
*/

// Time O(N)
function nextPermutation(nums) {
  let i = nums.length - 2;

  // Step 1: Find the first decreasing element from the right
  while (i >= 0 && nums[i] >= nums[i + 1]) {
    i--;
  }

  // i has the first decreading element from rigght to left
  // we need to validate we can find it
  if (i >= 0) {
    let j = nums.length - 1;
    // Step 2: Find the next larger element to swap with
    while (nums[j] <= nums[i]) {
      j--;
    }
    // Swap nums[i] and nums[j]
    swap(i, j, nums);
  }

  // Step 3: Reverse the part after index i
  let left = i + 1,
    right = nums.length - 1;
  reverse(left, right, nums);
}

function swap(start, end, nums) {
  let tmp = nums[start];
  nums[start] = nums[end];
  nums[end] = tmp;
}

function reverse(start, end, nums) {
  while (start < end) {
    swap(start, end, nums);
    start++;
    end--;
  }
}

var array = [1, 5, 8, 4, 7, 6, 5, 3, 1];
console.log(nextPermutation(array));
