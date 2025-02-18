/*
We have n jobs, where every job is scheduled to be done from startTime[i] to endTime[i]
obtaining a profit of profit[i].

You're given the startTime, endTime and profit arrays, return the maximum profit you can take such
that there are no two jobs in the subset with overlapping time range.

If you choose a job that ends at time X you will be able to start another job that starts at time X.

https://leetcode.com/problems/maximum-profit-in-job-scheduling/description/
*/

// Time: O(NLogN)
// Step 1: Sort based on start time to find the next one easier
// Step 2: DP with Memoization. Recursive function that calculates the maximum
// profit starting from an index, there are two possibilities:
// 1. Take the current job: add the profit and find the next non-overlapping job
// 2. Skip the current job: move to the next job without including the current one.
class JobState {
  constructor(startTime, endTime, profit) {
    this.startTime = startTime;
    this.endTime = endTime;
    this.profit = profit;
  }
}

var jobScheduling = function(startTime, endTime, profit) {
  let n = startTime.length;
  let arr = [];
  // Format the array
  for (let i = 0; i < n; i++) {
      arr.push(new JobState(startTime[i], endTime[i], profit[i]));
  }
  // Sort based on timestamp to find easier the overlaps
  arr.sort((a,b) => a.startTime - b.startTime);
  // To compute the profit, we don't want to compute the results every time
  let dp = new Array(arr.length).fill(-1);
  let maxProfit = helper(0, arr, dp);
  return maxProfit;
};

function helper(index, arr, dp) {
  // Base cases
  if(index >= arr.length) {
      return 0;
  }

  // Return already computed results
  if (dp[index] !== -1) {
      return dp[index];
  }

  // Find the next possible non-overlapping index
  let nextIndex = getNextIndex(arr, index);
  let takeCurrent = arr[index].profit + helper(nextIndex, arr, dp);
  // Profit without the existing profit
  let noTake = helper(index + 1, arr, dp);
  dp[index] = Math.max(takeCurrent, noTake);
  return dp[index];
}

// Get the next non-overlapping index
function getNextIndex(arr, currentIdx) {
  let lastJobEndTime = arr[currentIdx].endTime;
  let start = currentIdx + 1;
  let end = arr.length - 1;
  // Binary Search
  while (start <= end) {
      let mid = Math.floor((start + end) / 2);
      if (arr[mid].startTime < lastJobEndTime) {
          start = mid + 1;
      } else {
          end = mid - 1;
      }
  }
  return start;
}