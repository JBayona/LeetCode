/*
Given a collection of distinct numbers, return all possible permutations.
For example,
[1,2,3] have the following permutations:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
https://leetcode.com/problems/permutations/description/

Reference: https://leetcode.com/problems/permutations/solutions/18239/a-general-approach-to-backtracking-questions-in-java-subsets-permutations-combination-sum-palindrome-partioning
*/
// Option 1
// Time O(N!)
// Space O(N)
var permute = function (nums) {
  let result = [];
  let tmp = [];
  let set = new Set();
  dfs(result, tmp, nums, set);
  return result;
};

function dfs(result, tmp, nums, set) {
  if (tmp.length === nums.length) {
    result.push(tmp);
    return;
  }
  for (let i = 0; i < nums.length; i++) {
    if (set.has(nums[i])) {
      continue;
    }
    set.add(nums[i]);
    tmp.push(nums[i]);
    dfs(result, tmp.concat(), nums, set);
    tmp.pop();
    set.delete(nums[i]);
  }
}

// Option 2
// Time O(N!)
// Space O(N)
function permute(nums) {
  let result = [];
  backtrack([], nums, result);
  return result;
}

function backtrack(tmp, remaining, result) {
  if (remaining.length === 0) {
    result.push([...tmp]);
    return;
  }

  for (let i = 0; i < remaining.length; i++) {
    tmp.push(remaining[i]);
    backtrack(
      tmp,
      [...remaining.slice(0, i), ...remaining.slice(i + 1)],
      result
    );
    tmp.pop();
  }
}

// Option 3
// Time O(N!)
// Space O(N)
var permute = function (nums) {
  let result = [];
  let tmp = [];
  dfs(result, tmp, nums);
  return result;
};

function dfs(result, tmp, nums) {
  if (tmp.length === nums.length) {
    result.push(tmp);
    return;
  }
  for (let i = 0; i < nums.length; i++) {
    if (tmp.includes(nums[i])) {
      continue;
    }
    tmp.push(nums[i]);
    dfs(result, tmp.concat(), nums);
    tmp.pop();
  }
}

// Option 2
//Permutacion Heaps Algorithm
var permute = function (nums) {
  var result = [];
  heapPermutation(nums, nums.length, nums.length, result);
  return result;
};

//Generating permutation using Heap Algorithm
function heapPermutation(a, size, n, result) {
  // if size becomes 1 then prints the obtained
  // permutation
  if (size == 1) {
    result.push([...a]);
    //console.log(a);
  }

  for (var i = 0; i < size; i++) {
    heapPermutation(a, size - 1, n, result);

    // if size is odd, swap first and last
    // element
    if (size % 2 == 1) {
      var temp = a[0];
      a[0] = a[size - 1];
      a[size - 1] = temp;
    }

    // If size is even, swap ith and last
    // element
    else {
      var temp = a[i];
      a[i] = a[size - 1];
      a[size - 1] = temp;
    }
  }
}

array = [1, 2, 3];
console.log(permute(array));
