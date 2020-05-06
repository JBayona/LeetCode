// Time O(N*M) Where N is the length of the pattern and M is the length of the str
function binaryPatternMatching(pattern, str) {
  let vowels = ['a', 'e', 'i', 'o', 'u'];

  if(pattern.length > str.length) {
    return 0;
  }

  let k = pattern.length;
  let count = 0;
  let result = 0;
  for(let i = 0; i < str.length - k; i++) {
    count = 0;
    for(let j = 0; j < k; j++) {
      if(pattern[j] === '0' && vowels.includes(str[i+j])) {
        count++;
      } else if(pattern[j] === '1' && !vowels.includes(str[i+j])) {
        count++;
      }
    }
    if(count === k) {
      result++;
    }
  }
  return result;
}

pattern = "010";
str = "awesome";
console.log(binaryPatternMatching(pattern, str));