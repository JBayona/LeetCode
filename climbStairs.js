/*
You are climbing a stair case. It takes n steps to reach to the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

Note: Given n will be a positive integer.

https://www.youtube.com/watch?v=CFQk7OQO_xM
https://www.youtube.com/watch?v=5o-kdjv7FD0

http://www.geeksforgeeks.org/count-ways-reach-nth-stair/
https://leetcode.com/problems/climbing-stairs/description/
*/

var climbStairs = function(n) {
    var array = [];
    // Casos Base
    array[0] = 0;
    array[1] = 1; // Para llegar al primer escalon sólo tenemos una opción
    array[2] = 2; // Para el 2, tenemos dos opciones, (1,1) y 2
    for(let i = 3; i <= n; i++){
      array[i] = array[i - 1] + array[i - 2]; 
    }
    return array[n];
};

n = 5;
console.log(climbStairs(n));
