/*
We’re given an array of daily stock prices (integers for simplicity). Return the buying
and selling prices for making the maximum profit.

The values in the array represent the cost of stock each day. As we can buy and sell the
stock only once, we need to find the best buy and sell prices that maximize
profit (or minimized loss) over a given span of time.

We need to maximize the profit from a single buy and sell. If we can’t make
any profit, we’ll try to minimize the loss.

input = [7, 1, 5, 3, 6, 4]
output = (2, 5)

https://www.educative.io/courses/coderust-hacking-the-coding-interview/j2pGW
*/

let findBuySellStockPrices = function(stockNums) {
  if (!stockNums || stockNums.length < 2) {
     return;
   }
   // Initializations
   let currentBuy = stockNums[0];
   let globalSell = stockNums[1];
 
   // Calculating the global profit
   let globalProfit = globalSell - currentBuy;
   
   // Initializing current_profit with minimum value
   let currentProfit = 0;
   
   //  Looping over stocks to find best buy and selling price
   for (let i = 1; i < stockNums.length; i++) {
     // Calculating the current profit  
     currentProfit = stockNums[i] - currentBuy;
       
     // Current profit is greater than the global profit
     if (currentProfit > globalProfit) {
       globalProfit = currentProfit;
       globalSell = stockNums[i];
     }
     
     //  We will always maximise margin relative to the lowest stock price we can find
     // So whenever we find a stock price lower than the current buying price, 
     // we adopt it as the current buying price
     if (currentBuy > stockNums[i]) {
       currentBuy = stockNums[i];
     } 
   }
   // Tuple having buy price and sell price
   return [globalSell - globalProfit, globalSell];
 };