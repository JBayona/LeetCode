/*
Given a non-negative integer represented as a non-empty array of digits, plus one to the integer.
You may assume the integer do not contain any leading zero, except the number 0 itself.
The digits are stored such that the most significant digit is at the head of the list.

https://leetcode.com/problems/plus-one/description/
*/

// Option 1
var plusOne = function(digits) {
  let n = digits.length;
  for(let i = n - 1; i >= 0; i--) {
      if(digits[i] < 9) {
        digits[i]++;
        return digits;
      }
    digits[i] = 0;
  }
  // Reach here only if all of the above are 9.
  let newNumber = new Array (n+1).fill(0);
  newNumber[0] = 1;
  
  return newNumber;
};


// Option 2
var plusOne = function(digits) {
  let index = digits.length - 1;
  // Plus one
  digits[index]++;
  // If index is greater than 9
  while(digits[index] > 9) {
      digits[index] = 0;
      // If it's not the first digit, we need to add 1 at the very beginning
      if(index > 0) {
          digits[index - 1]++;
          // Move index
          index--;
      } else {
          digits.unshift(1);
          break;
      }
  }
  return digits;
};


//Option 3
var plusOne = function(digits) {
	var len = digits.length,
	var overflow = 1,

	for (var i = len - 1; i >= 0; i--) {
	    digits[i] = digits[i] + overflow;
	    if (digits[i] === 10) {
	        overflow = 1;
	        digits[i] = 0;
	    } else {
	        return digits;
	    }
	}

	/*Por si queda un elemento de overflow*/
	if (overflow === 1) {
	    digits.unshift(1);
	    return digits;
    }
};

//array = [8,9,9,9];
array = [6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,3];
console.log(plusOne(array));

//Option 4
var plusOne = function(digits) {
  let result = [];
  let value = 0;
  let carry = false;
  for(let i = digits.length - 1; i >= 0; i--){
    if(i === digits.length-1){
      value = digits[i] + 1;
      if(value >= 10){
        carry = true;
      }
      result.unshift(value%10);
    }else{
      value = carry ? (digits[i]+1) : digits[i];
      result.unshift(value%10);
      carry = value >=10 ? true : false;
    }
  }
  if(carry) result.unshift(1);
  return result;
};

//array = [8,9,9,9];
array = [6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,3];
console.log(plusOne(array));
