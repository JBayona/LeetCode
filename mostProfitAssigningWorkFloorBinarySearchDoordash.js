/*
You have n jobs and m workers. You are given three arrays: difficulty, profit, and worker where:

difficulty[i] and profit[i] are the difficulty and the profit of the ith job, and
worker[j] is the ability of jth worker (i.e., the jth worker can only complete a job with difficulty at most worker[j]).
Every worker can be assigned at most one job, but one job can be completed multiple times.

For example, if three workers attempt the same job that pays $1, then the total profit will be $3.
If a worker cannot complete any job, their profit is $0.
Return the maximum profit we can achieve after assigning the workers to the jobs.

Example 1:
Input: difficulty = [2,4,6,8,10], profit = [10,20,30,40,50], worker = [4,5,6,7]
Output: 100
Explanation: Workers are assigned jobs of difficulty [4,4,6,6] and they get a profit of [20,20,30,30] separately.

Example 2:
Input: difficulty = [85,47,57], profit = [24,66,99], worker = [40,25,25]
Output: 0

https://leetcode.com/problems/most-profit-assigning-work/description/
*/
// Time O(NLoN) sort + O(LogN)
// Approach:
// 1. Format data
// 2. Sort based on complexity, that will help us to increase
// as needed and maximize profit
// 3. Always try to maximize by taking the major profit with
// the existing difficulty, there might be scenarios a less difficult job
// is more profitable
// 4. Run floor binary search to get the index
var maxProfitAssignment = function (difficulty, profit, worker) {
  let n = worker.length;
  let data = [];
  // Format data
  for (let i = 0; i < n; i++) {
    data.push({ worker: i, difficulty: difficulty[i], profit: profit[i] });
  }
  // Sort by difficulty
  data.sort((a, b) => a.difficulty - b.difficulty);
  // Try to always maximize
  let max = -Infinity;
  for (let worker of data) {
    max = Math.max(max, worker.profit);
    worker.profit = max;
  }

  let result = 0;
  for (let i = 0; i < n; i++) {
    let index = binarySearch(data, worker[i]);
    if (index !== -1) {
      result += data[index].profit;
    }
  }
  return result;
};

// Floor Binary Search
function binarySearch(data, worker) {
  let start = 0;
  let index = -1;
  let end = data.length - 1;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (data[mid].difficulty <= worker) {
      index = mid;
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return index;
}
