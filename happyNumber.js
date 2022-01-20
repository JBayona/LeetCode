/*

Write an algorithm to determine if a number is "happy".
A happy number is a number defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits, and repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1. Those numbers for which this process ends in 1 are happy numbers.
Example: 19 is a happy number
1^2 + 9^2 = 82
8^2 + 2^2 = 68
6^2 + 8^2 = 100
1^2 + 0^2 + 0^2 = 1

*/

//Option 1 with functions
function happyNumber(n){
  var store = {};
  while(!(n in store) && n !== 1){ 
    store[n] = n;
    n = sumDigits(n);
  }
  return n == 1;
}

//Function that counts the square of each digit
function sumDigits(n){
  var sum = 0;
  while(n){
    sum += Math.pow((n%10),2);
    n = Math.floor(n/10);
  }
  return sum;
}

//Option 2
function happyNumber(n){
  var store = {};
  //Si no hemos checado el elemento y n no es 1, seguimos iterando
  //Si ya vimos encontramos el elemento en el hash, significa que no es happpy number
  //Si n es igual a uno, significa que es happy number
  while(!(n in store) && n !== 1){ 
    store[n] = n;
    n.toString().split('').forEach(function(item, index){
      if(index == 0){
        n = 0;
      }
      n += Math.pow(item,2);
    });
    n = parseInt(n); //Si es igual a uno significa que es Happy Number
  }
  return n == 1;
}

n = 7;
console.log(happyNumber(n));
