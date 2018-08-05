/*

Dynamic Programming is an approach to optimize our algorithm by storing intermediate
results so we don't compute again later, we break the problem in
subproblems, it can be approched by one of these three:
1. Recursion
2. Recursion + Memoization
3. Dynamic Programming (Bottom-up)
*/ 

// Complejidad O(2^n)
function fibonacci(n) {
  // Return the n fibonacci number
  // 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987
  if(n === 1 || n === 2) {
    result = 1;
  } else {
    result = fibonacci(n - 1) + fibonacci(n - 2);
  }
  return result;
}

n = 5
console.log(fibonacci(n));

// T(n) = # calls * t (tiempo que tarda)
// T(n) = 2n + 1 (el uno de la primera vez que lo llamamos)
// T(n) = O(2n + 1) = O(n)
memo = {};
function fibonacciMemo(n) {
  // Return the n fibonacci number
  // 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987
  if(memo[n]) {
    return memo[n]
  }

  if(n === 1 || n === 2) {
    result  = 1;
  } else {
    result = fibonacci(n - 1) + fibonacci(n - 2);
  }
  memo[n] = result
  return memo[n];
}

n = 5
console.log(fibonacciMemo(n));

// Time complexity O(n)
function fibonacciBottomUp(n) {
  if(n === 1 || n === 2) {
    return 1;
  }
  let dp = new Array(n+1);
  dp[0] = 0;
  dp[1] = 1;
  dp[2] = 1;
  for(let i = 3; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
  }
  console.log(dp);
  return dp[n];
}

n = 8
console.log(fibonacciBottomUp(n));