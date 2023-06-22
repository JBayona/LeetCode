/*
You are given an array prices where prices[i] is the price of a given
stock on the ith day, and an integer fee representing a transaction fee.

Find the maximum profit you can achieve. You may complete as many transactions as you like, but
you need to pay the transaction fee for each transaction.

Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

Example 1:
Input: prices = [1,3,2,8,4,9], fee = 2
Output: 8
Explanation: The maximum profit can be achieved by:
- Buying at prices[0] = 1
- Selling at prices[3] = 8
- Buying at prices[4] = 4
- Selling at prices[5] = 9
The total profit is ((8 - 1) - 2) + ((9 - 4) - 2) = 8.

Example 2:
Input: prices = [1,3,7,5,10,3], fee = 3
Output: 6

https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/description/
*/

var maxProfit = function (prices, fee) {
  if (prices.length <= 1) {
    return 0;
  }
  let buy = new Array(prices.length);
  let sell = new Array(prices.length);
  // At day 0 we cannot sell as we have not bought the stock
  // then state is -prices[0], and sell is 0 as we have not bought
  buy[0] = -prices[0];
  sell[0] = 0;
  for (let i = 1; i < prices.length; i++) {
    // At day i, we may buy stock (from previous sell status)
    // or do nothing (from previous buy status):
    buy[i] = Math.max(buy[i - 1], sell[i - 1] - prices[i]);
    // At day i, we may sell stock (from previous buy status)
    // or keep holding (from previous sell status):
    sell[i] = Math.max(sell[i - 1], buy[i - 1] + prices[i] - fee);
  }
  return sell[prices.length - 1];
};

// Three conditions:
// Buy
// Sell
// Hold
// Buy, then sell, then buy
// State of a given day depends on the state on prev day + action
// state[i] = state[i-1] + action
var maxProfit = function (prices, fee) {
  let sell = 0;
  let buy = -prices[0];
  for (let i = 0; i < prices.length; i++) {
    // This will become negative, that´s why we add up below
    buy = Math.max(buy, sell - prices[i]);
    // Buy is negative
    sell = Math.max(sell, prices[i] + buy - fee);
  }
  return sell;
};
