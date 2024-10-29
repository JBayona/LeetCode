/*
You are given a list of strings and a key. You have to find the string with the smallest
index for which it is a prefix.

Input= ["A", "Abet","akind"] key="a"
Output=2

Input= ["A", "Abet","akind"] key="b"
Output=-1

Input= ["A", "Abet","akind"] key="Ak"
Output=-1

Input= ["A", "Abet","akind"] key="ak"
Output=2

The character comparison is case sensitive.
The solution that I came up with was a binary search because the input was sorted.

https://leetcode.com/company/pinterest/discuss/2133879/Pinterest-or-Phone-Screen-or-USA
*/

function findLowestIndexPrefix(arr, key) {
  let minIdx = Infinity;
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    let middle = arr[mid];
    let compare = compareKeys(key, middle);

    if (compare == 0) {
      minIdx = Math.min(minIdx, mid);
      // still continue to do binary search
      end = mid - 1;
    } else if (compare == -1) {
      // key is less than middle
      end = mid - 1;
    } else {
      // key is greater than middle
      start = mid + 1;
    }
  }
  return minIdx === Infinity ? -1 : minIdx;
}

function compareKeys(s1, s2) {
  let minL = Math.min(s1.length, s2.length);
  let str1 = s1.substring(0, minL);
  let str2 = s2.substring(0, minL);
  return compareStringsASCII(str1, str2);
}

function compareStringsASCII(str1, str2) {
  const len = Math.min(str1.length, str2.length);

  for (let i = 0; i < len; i++) {
    const charCode1 = str1.charCodeAt(i);
    const charCode2 = str2.charCodeAt(i);

    if (charCode1 !== charCode2) {
      return charCode1 - charCode2;
    }
  }

  // If all characters matched so far, the shorter string is "smaller"
  return str1.length - str2.length;
}

// Input already sorted
let arr = ["A", "Abet", "akind"];
let key1 = "a";
let key2 = "b";
let key3 = "Ak";
let key4 = "ak";
console.log(findLowestIndexPrefix(arr, key1)); // 2
console.log(findLowestIndexPrefix(arr, key2)); // -1
console.log(findLowestIndexPrefix(arr, key3)); // -1
console.log(findLowestIndexPrefix(arr, key4)); // 2
