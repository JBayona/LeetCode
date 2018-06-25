/*
Given an array nums, there is a sliding window of size k which is moving from the very left of the array to the very right.
You can only see the k numbers in the window. Each time the sliding window moves right by one position.
Return the max sliding window.
https://leetcode.com/problems/sliding-window-maximum/description/
*/

//Opcion 1
// O(n*k)
function slidingWindowMax(array, k) {
  let result = [];
  let max = 0;
  for(let i = 0; i <= array.length - k; i++) {
    for(let j = 0; j < k; j++) {
      max = Math.max(max, array[i+j]);
    }
    result.push(max);
  }
  return result;
}

// Option 2 O(n)
// https://www.youtube.com/watch?v=J6o_Wz-UGvc

Array.prototype.front = function() {
  return this[0];
};

Array.prototype.back = function() {
  return this[this.length-1]
}

function slidingWindowMax(array, k) {
  let queue = [];
  let result = [];

  for(let i = 0; i < array.length; i++) {
    // Si ya nos excedimos de k, debemos recorrer la ventana (eliminamos el primer elemento del queue)
    if(queue.length && queue.front() === i - k) {
      queue.shift();
    }

    /*If our current element is greater than the back of the queue it 
    means that the back of the queue can never be a max element
    in subsequent windows, so we can remove it from the queue */
    while(queue.length && array[queue.back()] < array[i]) {
      queue.pop(); // We remove the element from the pop
    }

    // Insertamos los indexes
    /*Less element than the back of the queue could be max elments in subsequen windows*/
    queue.push(i);
    /* If we reach k we can insert the front (which is the max element) in our result array */
    if(i >= k - 1) {
      result.push(array[queue.front()]);
    }
  }
  return result;
}

array = [1, 2, 3, 1, 4, 5, 2, 3, 6];
k = 3;
console.log(slidingWindowMax(array,k));

