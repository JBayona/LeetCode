/*
Write a program which takes an array of n integers, where A[i] denotes the maximum you can advance from
index i abd returns wether it´s possible to advance to the last index starting from the beginning of the
array.

Solution: It´s natural to try to advance as much as possible but this aproach does not always work, we can
reach some point where it´s not possible to advance, For example if A = [2,4,1,1,0,2,3] if we advance to index 2
which contains 1, which leads to index 3, after which it cannot make progress. However advancing to index 1, which
contains a 4 lets us proceed to index 5, from which we can advance to index 6.

Los números en el array son el número máximo de posiciones que podemos avanzar, pero no necesariamente las debemos
usar, la idea es mantener un máximo y verificar si ese máximo es mayor al index.

https://leetcode.com/problems/jump-game/
https://leetcode.com/problems/jump-game/discuss/596182/javascript-beats-80.-simple-loop-w-comments
*/

var canJump = function(nums) {
	// This is the biges jump we can do
    let max = 0;
    let lastIndex = nums.length - 1;
    for(let i = 0; i < nums.length; i++) {
    	// Set new max to be the current max or i + jump size
        max = Math.max(max, nums[i] + i);
        // if we hit a 0 jump and our max can't cross this, break
        if(nums[i] === 0 &&  max <= i) {
        	break;
        }
    }
    return max >= lastIndex;
};

// Op 2
var canJump = function(nums) {
    let max = 0;
    let lastIndex = nums.length - 1;
    for(let i = 0; i <= max && max < lastIndex; i++) {
        max = Math.max(max, nums[i] + i);
    }
    return max >= lastIndex;
};

  array = [3,3,1,0,2,0,1];
  console.log(canJump(array));