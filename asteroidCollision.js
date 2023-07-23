/*
We are given an array asteroids of integers representing asteroids in a row.
For each asteroid, the absolute value represents its size, and the sign represents
its direction (positive meaning right, negative meaning left).
Each asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids meet, the
smaller one will explode.
If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.

https://leetcode.com/problems/asteroid-collision/description/
*/
// Time O(N)
// Space O(N)
var asteroidCollision = function (asteroids) {
  let stack = [];
  // Last element of the stack
  stack.push(asteroids.pop());
  // Handle possible collisions
  while (asteroids.length) {
    let a = asteroids[asteroids.length - 1];
    let b = stack[stack.length - 1];
    // Asteriods might collission as they have different sign
    if (b < 0 && a > 0) {
      // Asteroid with negative sign is winnning
      if (Math.abs(b) > Math.abs(a)) {
        asteroids.pop();
        // Both are destroyed
      } else if (Math.abs(b) === Math.abs(a)) {
        asteroids.pop();
        stack.pop();
      } else {
        stack.pop();
      }
    } else {
      // There's no collisions
      stack.push(asteroids.pop());
    }
  }

  // Final result, reformat the result as the
  // stack is formatted in reverse order
  let len = stack.length;
  for (let i = 0; i < len; i++) {
    asteroids.push(stack.pop());
  }
  return asteroids;
};

// Option 2
// O(N)
var asteroidCollision = function (asteroids) {
  let result = [];
  for (let i = 0; i < asteroids.length; i++) {
    collision: {
      // Here it we have a collision
      while (
        result.length &&
        asteroids[i] < 0 &&
        result[result.length - 1] > 0
      ) {
        if (Math.abs(result[result.length - 1]) < Math.abs(asteroids[i])) {
          // Asteroid moving to the left will destroy the asteroid if it´s greater
          result.pop();
          continue;
        } else if (
          Math.abs(result[result.length - 1]) === Math.abs(asteroids[i])
        ) {
          // Both asteroids collapse
          result.pop();
        }
        break collision;
      }
      // If there´s no collision we add the asteroid regardless the sign (we could have negative numbers at the beginning)
      result.push(asteroids[i]);
    }
  }
  return result;
};

// asteroids = [5, 10, -5];
// asteroids = [8, -8];
// asteroids = [10, 2, -5];
// asteroids = [-2, -1, 1, 2];
asteroids = [-2, -2, 1, -2];
console.log(asteroidCollision(asteroids));

function Asteroid(mass, direction) {
  this.mass = mass;
  this.direction = direction;
}

function countHits(input) {
  let stack = [];

  for (let i = 0; i < input.length; i++) {
    // There's no collision and we only add the mass to the stack
    if (input[i].direction >= 0) {
      stack.push(input[i].mass);
    } else {
      let asteroid = input[i];
      // Remove asteroids while the top of the stack is less than our
      // current asteroid
      while (stack.length && stack[stack.length - 1] < asteroid.mass) {
        stack.pop();
      }
      // If both asteroids have the same mass
      if (asteroid.mass === stack[stack.length - 1]) {
        stack.pop();
      }
    }
  }
  return stack.length;
}

var case1 = [
  new Asteroid(1, 1),
  new Asteroid(5, -1),
  new Asteroid(7, 1),
  new Asteroid(3, -1),
];

var case2 = [
  new Asteroid(1, 1),
  new Asteroid(3, 1),
  new Asteroid(5, 1),
  new Asteroid(7, -1),
];

var case3 = [new Asteroid(5, 1), new Asteroid(1, 1), new Asteroid(4, -1)];

var case4 = [new Asteroid(1, 1), new Asteroid(5, 1), new Asteroid(4, -1)];

function testCase(caseNum, asteroids, expected) {
  var actual = countHits(asteroids);
  var output = "Case " + caseNum + ": ";
  if (actual == expected) {
    output += "PASSED";
  } else {
    output += "FAILED; got " + actual + " expected " + expected;
  }
  console.log(output);
}

testCase(1, case1, 1);
testCase(2, case2, 0);
testCase(3, case3, 1);
testCase(4, case4, 2);
