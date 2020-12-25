/*
Given a large array of integers and a window of size ww, find the current maximum
value in the window as the window slides through the entire array.

Let’s try to find all maximums for a window size equal to 33 in the array given below:

arr = -4 2 -5 3 6

Step 1: For the first 3 elements in the window, max is 2.
Step 2: Slide window one position to the right and max for window becomes 3.
Step 3: In the last window, max is 6.

Result = [2, 3, 6]

https://www.educative.io/courses/coderust-hacking-the-coding-interview/k5llE
https://www.youtube.com/watch?v=m-Dqu7csdJk
*/

// Option 1
// Time O(N)
let findMaxSlidingWindow = function(arr, windowSize) {
  var result = [];
  if(arr.length == 0) {
    return [];
  }

  if(windowSize > arr.length) {
    return [];
  }

  let dequeue = [];
  // Find out max for the first window
  for(let i = 0; i < windowSize; i++) {
    while(dequeue.length && arr[i] > arr[dequeue[dequeue.length - 1]]) {
      dequeue.pop();
    }
    // Insert the index of the element
    dequeue.push(i);
  }

  // Push the firs one in the result, it's the first in the window.
  result.push(arr[dequeue[0]])

  for(let i = windowSize; i < arr.length; i++) {
    // remove all numbers that are smaller than current number
    // from the tail of list
    while (dequeue.length && arr[i] >= arr[dequeue[dequeue.length - 1]]) {
      dequeue.pop();
    }
    //remove first number if it doesn't fall in the window anymore
    if (dequeue.length > 0 && (dequeue[0] <= i - windowSize)) {
      dequeue.shift();
    }

    dequeue.push(i);
    result.push(arr[dequeue[0]]);
  }
  return result;
};

// Option 2
// Time O((N - k + 1) * k) = O(n * k)
let findMaxSlidingWindow = function(arr, window_size) {
  var result = [];
  let max = 0;
  for(let i = 0; i < arr.length - window_size + 1; i++) {
    max = arr[i];
    for(let j = 0; j < window_size; j++) {
      if(arr[i + j] > max) {
        max = arr[i + j];
      }
    }
    result.push(max);
  }
  return result;
};