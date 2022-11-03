/*
A gene string can be represented by an 8-character long string, with choices
from 'A', 'C', 'G', and 'T'.
Suppose we need to investigate a mutation from a gene string start to a gene string end where one mutation is defined as one single character changed in the gene string.

For example, "AACCGGTT" --> "AACCGGTA" is one mutation.
There is also a gene bank bank that records all the valid gene mutations. A gene must be in bank to make it a valid gene string.

Given the two gene strings start and end and the gene bank bank, return the minimum number of mutations needed to mutate from start to end. If there is no such a mutation, return -1.

Note that the starting point is assumed to be valid, so it might not be included in the bank.

Example 1:
Input: start = "AACCGGTT", end = "AACCGGTA", bank = ["AACCGGTA"]
Output: 1

Example 2:
Input: start = "AACCGGTT", end = "AAACGGTA", bank = ["AACCGGTA","AACCGCTA","AAACGGTA"]
Output: 2

Example 3:
Input: start = "AAAAACCC", end = "AACCCCCC", bank = ["AAAACCCC","AAACCCCC","AACCCCCC"]
Output: 3

https://leetcode.com/problems/minimum-genetic-mutation/description/v
*/

var minMutation = function (start, end, bank) {
  let banks = new Set(bank);
  // If the end form is not in the bank, there's no way we
  // can get to the result
  if (!banks.has(end)) {
    return -1;
  }
  let chars = ["A", "C", "G", "T"];
  let queue = [{ item: start, d: 0 }];

  while (queue.length) {
    let { item, d } = queue.shift();
    if (item === end) {
      return d;
    }

    // String is 8 chars long
    // 8 chars long and can be repllaced by 4 chars so we have
    // 8 * 4 = 32
    for (let i = 0; i < 8; i++) {
      // Generate all combinations
      for (let j = 0; j < 4; j++) {
        // If we have the same char, continue
        if (item[i] === chars[j]) {
          continue;
        }
        // Create combination
        let str = item.slice(0, i) + chars[j] + item.slice(i + 1);
        if (banks.has(str)) {
          queue.push({ item: str, d: d + 1 });
        }
      }
    }
  }
  return -1;
};
