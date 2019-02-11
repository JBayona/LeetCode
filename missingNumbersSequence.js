/*
Given a contiguous sequence of numbers in which each number repeats thrice, there is exactly one missing number. Find the missing number.
eg: 11122333 : Missing number 2
11122233344455666 Missing number 5
*/

function findMissingSequence(numbers) {
  let i = 0;
  while(i+2 < numbers.length) {
    if(numbers[i] !== numbers[i+2]) {
      return numbers[i];
    }
    i += 3;
  }
  // Todo correcto
  return -1;
}

// numbers = '11122333';
numbers = '11122233344455666';
console.log(findMissingSequence(numbers));
