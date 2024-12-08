/*
A given sequence is a number what is the sum of its digit plus the digits itself, for example
41 follows after 34, 41 = 34 + 3 + 4.

Given two numbers, find the join point
*/

function sequenceNumbers(n1, n2) {
  if (n1 === n2) {
    return n1;
  }

  // It's guaranteed that there's an overlap
  while (n1 !== n2) {
    if (n1 < n2) {
      n1 = getSequence(n1);
    } else {
      n2 = getSequence(n2);
    }
  }
  return n1;
}

function getSequence(n) {
  return n + getDigits(n);
}

function getDigits(n) {
  let result = 0;
  while(n) {
    result += (n % 10);
    n = (n / 10) | 0;
  }
  return result;
}

// console.log(sequenceNumbers(34, 56));