/*

Given a char array representing tasks CPU need to do. It contains capital letters A to Z where different letters represent different tasks.
Tasks could be done without original order. Each task could be done in one interval. For each interval, CPU could finish one task or just be idle.

However, there is a non-negative cooling interval n that means between two same tasks, there must be at least n intervals
that CPU are doing different tasks or just be idle.

You need to return the least number of intervals the CPU will take to finish all the given tasks.

Example:

Input: tasks = ["A","A","A","B","B","B"], n = 2
Output: 8
Explanation: A -> B -> idle -> A -> B -> idle -> A -> B.

Greedy Approach
https://www.youtube.com/watch?v=ySTQCRya6B0
https://leetcode.com/articles/task-scheduler/

*/
// Time O(NLogN)
// Time Space(N)
// The general idea is that for each task (single task) we need to wait "n"
// intervals to do the same task again, for example once we start with "A", we
// need to do "B" and something else before coming back to "A" assuming n = 2.
// The same logic applies for all tasks
var leastInterval = function (tasks, n) {
  let hash = {};
  // Greedy Approach
  // https://www.youtube.com/watch?v=ySTQCRya6B0
  // We donn´t care about which process we are computing
  // we take the biggest task to reduce the posibility to
  // reduce the cooling period
  // Count the frequency
  for (let task of tasks) {
    if (!(task in hash)) {
      hash[task] = 0;
    }
    hash[task]++;
  }

  // Get the max element in constant time
  let maxHeap = new PriorityQueue({
    compare: (a, b) => b - a,
  });

  // Add them all to the maxHeap
  for (let prop in hash) {
    maxHeap.enqueue(hash[prop]);
  }

  let result = 0;
  while (!maxHeap.isEmpty()) {
    let toProcess = [];
    // Try to run the tasks before the idle time
    // Prepare the tasks to run during the cycle
    // + 1 becuase it's inclusive
    for (let i = 0; i < n + 1; i++) {
      if (!maxHeap.isEmpty()) {
        toProcess.push(maxHeap.dequeue());
      }
    }

    // Process the tasks and decrement by one
    for (let process of toProcess) {
      // Decrement the process, if there are still to process
      // we push them back to the queue
      process--;
      if (process > 0) {
        maxHeap.enqueue(process);
      }
    }
    // n is the cool down
    // If maxHeap is empty means we were able to process the heap, if not
    // it means we need to wait for the cooling cycle that´s whys is +1
    // becuase is inclusive
    result += maxHeap.isEmpty() ? toProcess.length : n + 1;
  }
  return result;
};
