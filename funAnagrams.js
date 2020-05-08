/*
Fun with anagrams

str = [‘code’, ‘doce’, ‘ecod’, ‘framer’, ‘frame’]
The function we create should return the following: [‘code’, ‘frame’, ‘framer’]
‘doce’ and ‘ecod’ are both anagrams of code so they were removed and ‘code’ was left because it was the
first instance. Though “framer” and “frame” are similar they are different lengths so they are no anagrams.
*/

// Time O(N)
// Space O(N)
var funAnagrams = function(array) {
  let result = [];
  let hash = {};

  // Get hash of anagrams
  for(let i = 0; i < array.length; i++) {
    let elem = array[i];
    let sortedWord = elem.split('').sort().join('')
    if(!(sortedWord in hash)) {
      hash[sortedWord] = i;
      result.push(array[i]);
    }
  }
  return result.sort();
}

// Option 2
// Time O(N^2)
// Space O(1)

function funWithAnagrams(array){
  for(let i=0;i<array.length;i++){
    for(let j=array.length-1;j>i;j--){
      let sortedA = array[i].split("").sort().join("")
      let sortedB = array[j].split("").sort().join("")
      if(sortedA===sortedB){
        array.splice(j,1)
      }
    }
  }
  return array.sort()
}


array = ['code', 'doce', 'ecod', 'framer', 'frame'];
console.log(funAnagrams(array));

