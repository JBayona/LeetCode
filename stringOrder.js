/*
Verify whether a long text is following the order rule defined in 
order string. For example the order string is "abcd", which means "a" can't appear at
any position after "b", "c" and "d" in the text, "b" can't appear at any position after "c" and "d"
in the text and "c" can't appear at any position after "d" in the text. if the text is "axubbxcxbxd"
then the text didn't follow the rule, since "b" appears after "c" in substring "cxb".
Verify whether a long text is following the order rule defined in order string. For example the order string is "abcd",
which means "a" can't appear at any position after "b", "c" and "d" in the text, "b" can't appear at any position
after "c" and "d" in the text and "c" can't appear at any position after "d" in the text. if the text is "axubbxcxbxd"
then the text didn't follow the rule, since "b" appears after "c" in substring "cxb". 
*/

function verifyOrder(order, text) {
  // Create a map to store each character's index in the order string.
  const orderIndex = {};
  for (let i = 0; i < order.length; i++) {
    orderIndex[order[i]] = i;
  }

  // Track the highest index we've seen in order so far.
  let maxIndex = -1;

  // Traverse the text and check for ordering.
  for (const char of text) {
    if (char in orderIndex) {
      // Only consider characters in the order string
      const currentIndex = orderIndex[char];
      if (currentIndex < maxIndex) {
        return false; // Found a character out of order
      }
      maxIndex = currentIndex;
    }
  }
  return true; // All characters are in the correct order
}

// Test cases
console.log(verifyOrder("abcd", "axubbxcxbxd")); // Expected output: False
console.log(verifyOrder("abcd", "bd")); // Expected output: True
console.log(verifyOrder("abcd", "axubxcxbxd")); // Expected output: False
