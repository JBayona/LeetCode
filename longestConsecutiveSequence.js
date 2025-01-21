/*
Given an unsorted array of integers, find the length of the longest consecutive elements sequence.
For example,
Given [100, 4, 200, 1, 3, 2],
The longest consecutive elements sequence is [1, 2, 3, 4]. Return its length: 4.
Your algorithm should run in O(n) complexity.

https://leetcode.com/problems/longest-consecutive-sequence/description/

For example:
Given [100,4,200,1,3,2] the longest consecutive sequence is [1,2,3,4];
So, the result is 4
/

/*
  1 2 3 4.     100.       200
|------------------------------|
*/
// Time O(N)
// Space O(N)
var longestConsecutive = function (nums) {
  let result = 0;
  let set = new Set(nums);
  for (let num of nums) {
    // Find the start of the element in the sequence
    // The start is the one not found in the array, that
    // will always be a start
    if (!set.has(num - 1)) {
      let len = 1;
      while (set.has(num + len)) {
        len++;
      }
      result = Math.max(result, len);
    }
  }
  return result;
};

// Time O(NLogN)
// Time O(NLogN)
var longestConsecutive = function (nums) {
  if (!nums.length) {
    return 0;
  }
  // There can always be a single sequence
  let result = 1;
  nums.sort((a, b) => a - b);
  let len = 1;
  for (let i = 0; i < nums.length - 1; i++) {
    // Check numbers are consecutive
    if (nums[i] + 1 == nums[i + 1]) {
      len++;
      result = Math.max(len, result);
    } else if (nums[i] === nums[i + 1]) {
      // If numbers are the same, continue
      continue;
    } else {
      // Start of a new sequence
      len = 1;
    }
  }
  return result;
};

// Option 1
// Time O(N)
// Space O(N)
var longestConsecutive = function (nums) {
  let hash = {};
  let seen = {};
  let result = 0;

  for (let num of nums) {
    if (num in seen) {
      continue;
    }
    seen[num] = true;
    let left = num;
    let right = num;

    if (num + 1 in hash) {
      right = hash[num + 1][0];
    }

    if (num - 1 in hash) {
      left = hash[num - 1][1];
    }

    hash[right] = [right, left];
    hash[left] = [right, left];
    result = Math.max(result, right - left + 1);
  }
  return result;
};

// Option 2
// Time complexity O(N)
// Space complexity O(N)
var longestConsecutive = function (nums) {
  // If there's no number in the array, return 0
  if (!nums.length) {
    return 0;
  }

  let hash = {};
  // Store all the elements in the hash
  for (let i = 0; i < nums.length; i++) {
    hash[nums[i]] = true;
  }

  // Minimum longest should be 1
  let count = 1;
  let result = 1;
  let current = null;
  for (let prop in hash) {
    let num = parseInt(prop);
    count = 1;
    current = num;
    while (current + 1 in hash) {
      current++;
      count++;
      result = Math.max(count, result);
    }
  }
  return result;
};

/*O(n) solution*/
function findLongestConseqSubseq(array) {
  var map = {};
  var answer = 0;
  var visited = [];
  var element = null;
  var value = null;
  var left,
    right = 0;
  var currLen = 0;

  if (array.length === 0) return 0;

  /*The numbers are sorted in the map, example*/
  //{1:0, 2:6, 3:2, 4:4, 5:7, 9:1, 10:3, 20:5}
  for (let i = 0; i < array.length; i++) {
    map[array[i]] = i;
  }
  console.log(map);

  for (var val in map) {
    //Aqui tenemos el index
    element = map[val];
    if (visited[element]) {
      continue;
    }

    /*Empezamos analizando los elementos del hash
    obteniendo el elemento left y right*/
    value = parseInt(val);
    left = value - 1;
    right = value + 1;
    currLen = 1;

    /*Si hay left, significa que el elemento no es el
    primero de la secuencia y que hay valores menores*/
    while (map.hasOwnProperty(left)) {
      visited[map[left]] = true;
      currLen++;
      left--;
    }

    /*Si no hay right, significa que el elemento es el
    primero de la secuencia*/
    while (map.hasOwnProperty(right)) {
      visited[map[right]] = true;
      currLen++;
      right++;
    }
    /*Debemos marcar el array como visited para no repetir
    la busqueda a aquellos elementos que ya analizamos, la busqueda
    es O(1) y el algoritmo tiene complejidad O(n)*/

    answer = currLen > answer ? currLen : answer;
  }

  return answer;
}

array = [1, 9, 3, 10, 4, 20, 2];
console.log(findLongestConseqSubseq(array));
