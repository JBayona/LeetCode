/*
We are given an array asteroids of integers representing asteroids in a row.

For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right,
negative meaning left). Each asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode.
If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.

https://leetcode.com/problems/asteroid-collision/description/
*/


// O(N)
var asteroidCollision = function(asteroids) {
  let result = [];
  for(let i = 0; i < asteroids.length; i++) {
    collision: {
      while(result.length && asteroids[i] < 0 && result[result.length-1] > 0) {
        if(Math.abs(result[result.length-1]) < Math.abs(asteroids[i])) {
          result.pop();
          continue;
        } else if (Math.abs(result[result.length-1]) === Math.abs(asteroids[i])) {
          result.pop();
        }
        break collision;
      }
      result.push(asteroids[i]);
    }
  }
return result;
};

// asteroids = [5, 10, -5];
// asteroids = [8, -8];
// asteroids = [10, 2, -5];
// asteroids = [-2, -1, 1, 2];
asteroids = [-2,-2,1,-2];
console.log(asteroidCollision(asteroids));
