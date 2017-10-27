/*
Generate all combinations with k letters from a to z, for instance, k = 2, aa, ab, ac,.....zz
*/

function printAllKLenght(k){
  let n = 26;
  printCombinations('',n, 0,k);
}

function printCombinations(prefix,n,index,k){
  if(index === k){
    console.log(prefix);
    return;
  }
  for(let i = 0; i < n; i++){
    let newPrefix = prefix + String.fromCharCode(97 + i);
    printCombinations(newPrefix, n, index + 1, k);
  }
}

n = 2;
console.log(printAllKLenght(n));