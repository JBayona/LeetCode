/*
Given two strings s and t , write a function to determine if t is an anagram of s.

Example 1:
Input: s = "anagram", t = "nagaram"
Output: true

Example 2:
Input: s = "rat", t = "car"
Output: false
Note:
You may assume the string contains only lowercase alphabets.

Follow up:
What if the inputs contain unicode characters? How would you adapt your solution to such case?

https://leetcode.com/problems/valid-anagram/description/
*/

// Time O(N)
// Space O(N)
var isAnagram = function(s, t) {
    if (s.length !== t.length) {
        return false;
    }

    let counter = getFrequency(s);

    for (let i = 0; i < t.length; i++) {
        let c = t[i];
        if (!(c in counter) || counter[c] === 0) {
            return false;
        }
        counter[c]--;
    }
    return true;
};

function getFrequency(str) {
    let map = {};
    for (let i = 0; i < str.length; i++) {
        let c = str[i];
        if (!(c in map)) {
            map[c] = 0;
        }
        map[c]++;
    }
    return map;
}


// Option 2
/*
var isAnagram = function(s, t) {
    let map1 = getFrequency(s);
    let map2 = getFrequency(t);

    if (Object.keys(map1).length !== Object.keys(map2).length) {
        return false;
    }

    for (let prop in map1) {
        if(map1[prop] !== map2[prop]) {
            return false;
        }
    }
    return true;
};

function getFrequency(str) {
    let map = {};
    for (let i = 0; i < str.length; i++) {
        let c = str[i];
        if (!(c in map)) {
            map[c] = 0;
        }
        map[c]++;
    }
    return map;
}

/*
// Time O(N) Space O(N)
var isAnagram = function(s, t) {
  let array1 = new Array(26).fill(0);
  let array2 = new Array(26).fill(0);
  
  for(let i = 0; i < s.length; i++) {
      let index = s[i].charCodeAt(0) - 'a'.charCodeAt(0);
      array1[index]++;
  }
  
  for(let i = 0; i < t.length; i++) {
      let index = t[i].charCodeAt(0) - 'a'.charCodeAt(0);
      array2[index]++;
  }
  
  for(let i = 0; i < 26; i++) {
      if(array1[i] !== array2[i]) {
          return false;
      }
  }
  
  return true;
};
*/

// Time O(N) Space O(N)
var isAnagram = function(s, t) {
  let array1 = new Array(26).fill(0);
  let array2 = new Array(26).fill(0);
  
  for(let i = 0; i < s.length; i++) {
      let index = s[i].charCodeAt(0) - 'a'.charCodeAt(0);
      array1[index]++;
  }
  
  for(let i = 0; i < t.length; i++) {
      let index = t[i].charCodeAt(0) - 'a'.charCodeAt(0);
      array2[index]++;
  }
  
  for(let i = 0; i < 26; i++) {
      if(array1[i] !== array2[i]) {
          return false;
      }
  }
  
  return true;
};


// Time O(N) Space O(N)
var isAnagram = function(s, t) {
  let hash1 = createHash(s);
  let hash2 = createHash(t);
  
  if(Object.keys(hash1).length !== Object.keys(hash2).length) {
      return false;
  }
  
  for(let prop in hash1) {
    if(!(prop in hash2)) {
        return false;
    } else if(hash1[prop] !== hash2[prop]) {
        return false;
    }
  }
  
  return true;
    
};

function createHash(str) {
    let hash = {};
    
    for(let i = 0; i < str.length; i++) {
        if(str[i] in hash) {
            hash[str[i]]++;
        } else {
            hash[str[i]] = 1;
        }
    }
    
    return hash;
}


// Time O(NLogN) Space O(N)
var isAnagram = function(s, t) {
  return sort(s) === sort(t);
};

function sort(s) {
  return s.split('').sort().join('');
}
