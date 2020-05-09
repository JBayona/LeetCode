/*
Tapping multiple times a digit will map to a specific key, we 
need to check which number is mapped
*/

let mapping = {
  '2': 'ABC',
  '3': 'DEF',
  '4': 'GHI',
  '5': 'JKL',
  '6': 'MNO',
  '7': 'PQRS',
  '8': 'TUV',
  '9': 'WXYZ',
  '0': " "
};

// const getNumberPhone = function(input) {
//   let result = '';
//   let count = 1;
//   for(let i = 0; i < input.length; i++) {
//     if(input[i] === input[i+1]) {
//       count++;
//     } else {
//       let digit = input[i];
//       result += mapping[digit][count - 1];
//       count = 1;
//     }
//   }
//   return result;
// }

const getNumberPhone = function(input) {
  let result = '';
  let count = 1;
  for(let i = 0; i < input.length; i++) {
    if(input[i] === input[i+1]) {
      count++;
    }else if(input[i] === "*") {
      count = 1;
    } else {
      let digit = input[i];
      result += mapping[digit][count - 1];
      count = 1;
    }
  }
  return result;
}

// input = "22"; // B
// input = "323"; // DAD
// input = "224448"; // BIT
// input = "22*24"; //BAG
input = "2224"; //BAG
console.log(getNumberPhone(input));