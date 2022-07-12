/*
ou write down a secret number and ask your friend to guess what the number is. When your friend makes a guess
you provide a hint with the following info:

The number of "bulls", which are digits in the guess that are in the correct position.
The number of "cows", which are digits in the guess that are in your secret number but are located in the wrong position.
Specifically, the non-bull digits in the guess that could be rearranged such that they become bulls.
Given the secret number secret and your friend's guess guess, return the hint for your friend's guess.

The hint should be formatted as "xAyB", where x is the number of bulls and y is the number of cows. Note that both secret and guess may contain duplicate digits.
Example 1:
Input: secret = "1807", guess = "7810"
Output: "1A3B"
Explanation: Bulls are connected with a '|' and cows are underlined:
"1807"
  |
"7810"

Example 2:
Input: secret = "1123", guess = "0111"
Output: "1A1B"
Explanation: Bulls are connected with a '|' and cows are underlined:
"1123"        "1123"
  |      or     |
"0111"        "0111"
Note that only one of the two unmatched 1s is counted as a cow since the non-bull digits can only be rearranged to allow one 1 to be a bull.

https://leetcode.com/problems/bulls-and-cows/
*/

var getHint = function (secret, guess) {
  let bulls = 0;
  let cows = 0;
  let hash1 = {};
  let hash2 = {};

  for (let i = 0; i < secret.length; i++) {
    if (secret[i] === guess[i]) {
      bulls++;
    }
    let tmp = secret[i];
    if (!(tmp in hash1)) {
      hash1[tmp] = 0;
    }
    hash1[tmp]++;

    let tmp2 = guess[i];
    if (!(tmp2 in hash2)) {
      hash2[tmp2] = 0;
    }
    hash2[tmp2]++;
  }

  for (let prop in hash1) {
    if (prop in hash2) {
      cows += Math.min(hash1[prop], hash2[prop]);
    }
  }
  return `${bulls}A${cows - bulls}B`;
};
