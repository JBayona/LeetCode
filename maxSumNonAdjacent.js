/*
Given an array of integers, find a maximum sum of non-adjacent elements.
For example, inputs [1, 0, 3, 9, 2] should return 10 (1 + 9).

http://blog.gainlo.co/index.php/2016/12/02/uber-interview-question-maximum-sum-non-adjacent-elements/
*/

function maxSumNonAdjacent(nums){
  //DP Solution
  var exclusive = 0;
  var inclusive = nums[0];
  var tmp = 0;

  for(let i = 1; i < nums.length; i++){
    tmp = inclusive;
    inclusive = Math.max(inclusive, exclusive + nums[i]);
    exclusive = tmp;
  }
  return inclusive;
}

array = [1, 0, 3, 9, 2];
console.log(maxSumNonAdjacent(array));