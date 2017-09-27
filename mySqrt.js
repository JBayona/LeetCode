/*
Implement int sqrt(int x).

Compute and return the square root of x.
https://leetcode.com/problems/sqrtx/description/
*/

var mySqrt = function(x) {
    //Base cases
    if(x === 0 || x === 1) return x;
    let pow = 1;
    let result = 1;
    while(result <= x){
      //Si es exacta regresamos el resultado
      if(result === x){
          return pow;
      }
      pow++;
      result = pow * pow;
    }
    return pow-1;
};

n = 9;
console.log(mySqrt(n));