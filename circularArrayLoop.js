/*
You are given an array of positive and negative integers. If a number n at an index is positive, then move forward n steps. Conversely, if it's negative (-n), move backward n steps. Assume the first element of the array is forward next to the last element, and the last element is backward next to the first element. Determine if there is a loop in this array. A loop starts and ends at a particular index with more than 1 element along the loop. The loop must be "forward" or "backward'.

Example 1: Given the array [2, -1, 1, 2, 2], there is a loop, from index 0 -> 2 -> 3 -> 0.

Example 2: Given the array [-1, 2], there is no loop.

Note: The given array is guaranteed to contain no element "0".

Can you do it in O(n) time complexity and O(1) space complexity?

https://leetcode.com/problems/circular-array-loop/description/
*/

//Two pointers
var circularArrayLoop = function(nums) {
  if(!nums || nums.length < 2) {
    return false;
  }

  let n = nums.length;

  for(let i = 0; i < n; i++) {
    // No need to move
    if(nums[i] === 0) continue;
    let slow = i;
    let fast = move(nums, slow);
    /** 
     * Whether i is positive or negative defines our direction, so if
     * the directions differ, so too will the signs.
     * If the signs differ, we can't be in a 'forward' or a 'backward'
     * loop, so we exit the traverse.
     */
    while(nums[slow] * nums[fast] > 0 && 
      nums[i] * nums[move(nums, fast)] > 0) {
      if(slow === fast) {
        // check for loop with only one element
        if (slow == move(nums, slow)) {
          break;
        }
        return true;
      }
      slow = move(nums, slow);
      fast = move(nums, move(nums, fast));
    }

    /**
     * If we're here, we didn't find a loop, so we know this path
     * doesn't have a loop, so we re-traverse it until we reverse
     * direction or encounter a '0' element.
     * During the re-traverse, we set each element we see to 0.
     */
    slow = i;
    let sgn = nums[i];
    while (sgn * nums[slow] > 0) {
        let tmp = move(nums, slow);
        nums[slow] = 0;
        slow = tmp;
    }
  }
  return false;
}; 

function move(nums, i) {
  let n = nums.length;
  return (nums[i] + i + n) % n;
}

// Grafo dirigido
var circularArrayLoop = function(nums) {
  let n = nums.length;
  let adj = new Array(n);
  // Form graph
  // Array has the index of the element will go
  for(let i = 0; i < n; i++) {
    // Si no es el mismo
    if(i !== (i + array[i] + n)%n) {
      adj[i] = (i + array[i] + n)%n;
    } /*else {
      adj[i] = i;
    }*/
  }
  // DFS
  let visited = new Array(n).fill(false);
  for(let i = 0; i < n; i++) {
    if(!visited[i]) {
      visited[i] = true;
      if(dfs(adj, visited, adj[i])){
        return true;
      }
    } 
  }
  return false;
}

function dfs(adj, visited, pos) {
  // Is the same, no loop
  if(pos === undefined) {
    return false;
  }
  if(!visited[pos]) {
    visited[pos] = true;
    return dfs(adj, visited, adj[pos]);
  }else { 
    return true;
  }
}

 //array = [1, 2, 3, 4, 5];
 array = [-2, 1, -1, -2, -2];
 console.log(circularArrayLoop(array));