/*
From any string, we can form a subsequence of that string by deleting some number
of characters (possibly no deletions).

Given two strings source and target, return the minimum number of subsequences of source such
that their concatenation equals target. If the task is impossible, return -1.

Example 1:
Input: source = "abc", target = "abcbc"
Output: 2
Explanation: The target "abcbc" can be formed by "abc" and "bc", which are subsequences of source "abc".

Example 2:
Input: source = "abc", target = "acdbc"
Output: -1
Explanation: The target string cannot be constructed from the subsequences of source string due to the character "d" in target string.

Example 3:
Input: source = "xyz", target = "xzyxz"
Output: 3
Explanation: The target string can be constructed as follows "xz" + "y" + "xz".
*/

// Option 1
const shortestWay = (source, target) => {
  let index = 0;
  let result = 0;
  while(index < target.length) {
    let prev = index;

    for(let i = 0; i < source.length; i++) {
      if(index < target.length && source[i] === target[index]) {
        index++;
      }
    }
    // Char not found
    if(prev === index) {
      return -1;
    }
    result++;
  }
  return result;
}

// Option 2
const shortestWay = (source, target) => {
  let result = 0;
  let start = 0;
  let end = target.length;
  while(start < end) {
    start = longestSubsequence(source, target, start);
    // There's a char not found
    if(start < 0) {
      return -1;
    } else {
      result++;
    }
  }
  return result;
}

const longestSubsequence = (source, target, initIndex) => {
  const lengthA = source.length;
  const lengthB = target.length;
  let sourceIndex = 0;
  let targetIndex = initIndex;
  while(sourceIndex < lengthA && targetIndex < lengthB) {
    let c1 = source[sourceIndex];
    let c2 = target[targetIndex];
    if(c1 === c2) {
      targetIndex++;
    }
    sourceIndex++;
  }

  return targetIndex === initIndex ? -1 : targetIndex;
}

//source = "abc";
//target = "abcbc"; 2
// source = "abc";
// target = "acdbc" -1
source = "xyz";
target = "xzyxz" // 3
console.log(shortestWay(source, target));