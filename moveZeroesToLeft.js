/*
We’re given an integer array, nums. Move all zeroes, if any, to the left while maintaining the order of other elements in the array.
All changes must be made in nums itself; no return value is expected.

Sample input
[1, 10, 20, 0, 59, 63, 0, 88, 0]
Expected output
[0, 0, 0, 1, 10, 20, 59, 63, 88]
*/

let moveZerosToLeft = function(nums) {
  let readIndex = nums.length - 1;
  let writeIndex = nums.length - 1;

  // Insert non-zero at the end of the array
  // Starting from the back
  while(readIndex >= 0) {
    if (nums[readIndex] !== 0) {
      nums[writeIndex] = nums[readIndex];
      writeIndex--;
    }
    readIndex--;
  }

  while(writeIndex >= 0) {
    nums[writeIndex] = 0;
    writeIndex--;
  }
  return nums;
};