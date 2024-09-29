/*
Given a digit string, return all possible letter combinations that the number could represent.

A mapping of digit to letters (just like on the telephone buttons) is given below.

https://leetcode.com/problems/letter-combinations-of-a-phone-number/#/description
*/

// Time O(4^N) where NN is the length of the digits and 4 can be the max letters we coulld have
// Space O(N) account for the recursion stack
var letterCombinations = function(digits) {
  // Para matchearlo con los elementos exactos sin tener que hacer alguna otra operación
  let map = ['0', '1', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
  let result = [];
  if(digits.length === 0) return []
  combinations(result, '', map, digits, 0);
  return result;
};

function combinations(result, tmp, map, digits, index){
  if(index === digits.length) {
      result.push(tmp);
      return;
  }
  
  let number = Number(digits[index]);
  let possibleChars = map[number];
  for(let i = 0; i < possibleChars.length; i++) {
      combinations(result, tmp + possibleChars.charAt(i), map, digits, index + 1);
  }
}

// Option 2
var letterCombinations = function(digits) {
  var length = digits.length;
  var hash = {	
    '1' : '',
    '2' : ['a', 'b', 'c'],
    '3' : ['d', 'e', 'f'],
    '4' : ['g', 'h', 'i'],
    '5' : ['j', 'k', 'l'],
    '6' : ['m', 'n', 'o'],
    '7' : ['p', 'q', 'r', 's'],
    '8' : ['t', 'u', 'v'],
    '9' : ['w', 'x', 'y', 'z']
  }
  if(digits.length === 0) return [];
  return combineLettersKey([''], 0, length, digits, hash);
};

function combineLettersKey(currentCombinations, index, length, digits, hash){
  var next = [];
  var tmp = '';
  if(index === length) return currentCombinations;
  //Iteramos hasta el arreglo en donde vamos metiendo todas las combinaciones, ahí iremos concatenando todo
  //Nuestro arreglo de combinaciones lo usamos para meter todo concatenando con lo nuevo de los digitos
  for(var i = 0; i < currentCombinations.length; i++){
    for(var j = 0; j < hash[digits.charAt(index)].length; j++){
      tmp = currentCombinations[i] + hash[digits.charAt(index)][j];
      next.push(tmp);
    }
  }
  return combineLettersKey(next, index+1, length, digits, hash);
}

digits = "23";
console.log(letterCombinations(digits));
