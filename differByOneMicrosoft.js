/*
Maximum possible value by inserting 5 (Data Structure)
Introduction (Interview Questions)
Write a function that returns the maximum possible value obtained by inserting one '5' digit inside the decimal representation of integer N.

https://www.knowsh.com/Notes/250501/Maximum-Possible-Value-By-Inserting-5
*/

function maximumPossibleNumber(n) {
  let sign = n < 0 ? -1 : 1;

  n = Math.abs(n);
  nString = n.toString();
  for(let i = 0; i < nString.length; i++) {
    // If it's positive number and the actual number is less than 5, that's the place where it belongs
    if(sign > 0 && nString[i] < '5') {
      nString = nString.substring(0, i) + '5' + nString.substring(i);
      break;
    }
    // If it's not a positive number, we should to the opposite and find the first number greater than 5
    if(sign < 0 && nString[i] > '5') {
      nString = nString.substring(0, i) + '5' + nString.substring(i);
      break;
    }
  }
  return Number(nString) * sign;
}


n = 268;
n = -999;
n = 670;
n = 0;
console.log(maximumPossibleNumber(n));