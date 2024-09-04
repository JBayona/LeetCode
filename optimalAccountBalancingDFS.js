/*
You are given an array of transactions transactions where transactions[i] = [fromi, toi, amounti]
indicates that the person with ID = fromi gave amounti $ to the person with ID = toi.

Return the minimum number of transactions required to settle the debt.

Example 1:
Input: transactions = [[0,1,10],[2,0,5]]
Output: 2
Explanation:
Person #0 gave person #1 $10.
Person #2 gave person #0 $5.
Two transactions are needed. One way to settle the debt is person #1 pays person #0 and #2 $5 each.

Example 2:
Input: transactions = [[0,1,10],[1,0,1],[1,2,5],[2,0,5]]
Output: 1
Explanation:
Person #0 gave person #1 $10.
Person #1 gave person #0 $1.
Person #1 gave person #2 $5.
Person #2 gave person #0 $5.
Therefore, person #1 only need to give person #0 $4, and all debt is settled.

https://leetcode.com/problems/optimal-account-balancing/description
*/

// Time O(2^N)
// Approach
// Find the balance for each user by adding / resting the money "from" to "to"
// Ignore zero balances as they don't change anything
// Run a DFS and whenever there's a different sign, try to pay from the "current" to the "next" one
// Run recursion to backtrack and exhaust all possibilities to see if the balances are all zero later
var minTransfers = function (transactions) {
  // Balance
  let map = {};
  for (let transaction of transactions) {
    let [from, to, balance] = transaction;
    if (!(from in map)) {
      map[from] = 0;
    }
    if (!(to in map)) {
      map[to] = 0;
    }
    // Pay from to
    map[from] -= balance;
    // Receive money
    map[to] += balance;
  }

  // Users with zero balance are irrelevant, they are settle down
  let debt = [];
  for (let prop in map) {
    if (map[prop] !== 0) {
      debt.push(map[prop]);
    }
  }

  // Run DFS
  let currentDebtIndex = 0;
  return dfs(0, debt);
};

function dfs(currentDebtIndex, debt) {
  // Get the next current non-zero debt, ignore zero balances
  while (currentDebtIndex < debt.length && debt[currentDebtIndex] === 0) {
    currentDebtIndex++;
  }

  // End of array
  if (currentDebtIndex === debt.length) {
    return 0;
  }

  let result = Infinity;
  for (let i = currentDebtIndex + 1; i < debt.length; i++) {
    // For a transaction to be valid, it should have different signs as one owns and other receives
    // In order to check this, the multiplication should be < 0 as signs should be different
    if (debt[i] * debt[currentDebtIndex] < 0) {
      // Add the balance of current to the next one
      debt[i] += debt[currentDebtIndex];
      // Recursive call
      result = Math.min(result, 1 + dfs(currentDebtIndex + 1, debt));
      // Remove the prevoius balance by Backtrack
      debt[i] -= debt[currentDebtIndex];
    }
  }
  return result;
}
