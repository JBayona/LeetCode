/*
Given a string, remove the strings whenever occurrences are greater or
equal to 3 for example "AAABB" is "BB" and "BBAAAABB" is ""
*/

// Approach
// Use a stack with the character and counter
// After insertion, check if you can pop elements
// Form the string and call recursivelly again until we
// cannot reduce the string more, the same result it's the input
function removeConsecutiveTriples(s) {
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    let c = s[i];
    // If the character is the same, increment the count
    if (stack.length && stack[stack.length - 1].char === c) {
      stack[stack.length - 1].count++;
    } else {
      stack.push({ char: c, count: 1 });
    }

    // If the count reaches >= 3 we pop
    if (stack[stack.length - 1].count >= 3) {
      stack.pop();
    }
  }

  // Reconstruct the string from the stack
  let result = "";
  for (let elem of stack) {
    let { char, count } = elem;
    result += char.repeat(count);
  }
  return result === s ? result : removeConsecutiveTriples(result);
}

console.log(removeConsecutiveTriples("AABBB")); // "AA"
console.log(removeConsecutiveTriples("AAABBB")); // ""
console.log(removeConsecutiveTriples("AABBBACCC")); // ""
console.log(removeConsecutiveTriples("ABBACCCB")); // ""