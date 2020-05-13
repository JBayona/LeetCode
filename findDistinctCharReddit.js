// There are two identical strings. A character is inserted into one of them.
// Write a function to find an return the inserted character.
// Eg. with input "abcd", "abXcd", your function should return "X".

// Following from #1, one of the strings is now shuffled. Eg. "abcd", "bdcXa" should return "X".
function getDifferentChar(s1, s2) {
  // Make sure s1 is always greater
  if(s2.length > s1.length) {
    return getDifferentChar(s2, s1);
  }

  // We know s1 is always the greater string
  let map1 = getHash(s1);
  let map2 = getHash(s2);

  // map1 has always the most elements, so to find the element which is different we need to check whether
  // the prop exists in map2 and then check if the frequency is different
  for(let prop in map1) {
    if(!(prop in map2) || map1[prop] !== map2[prop]) {
      return prop;
    }
  }
  return null;
}

function getHash(str) {
  let map = {};
  for(let c of str) {
    if(c in map) {
      map[c]++;
    } else {
      map[c] = 1;
    }
  }
  return map;
}

//let s1 = "abcd";
//let s2 = "abXcd";

//let s1 = "Xabcd";
//let s2 = "abcd";

// let s1 = "abcd";
// let s2 = "abcd"

// let s1 = "abcd";
// let s2 = "abcdX";

// let s1 = "aaaa";
// let s2 = "aaa";

let s1 = "abcd";
let s2 = "bdcXa";
console.log(getDifferentChar(s1,s2));