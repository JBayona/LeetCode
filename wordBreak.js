/*
Given a non-empty string s and a dictionary wordDict containing a list of
non-empty words, determine if s can be segmented into a space-separated sequence
of one or more dictionary words. You may assume the dictionary does not contain
duplicate words.

For example, given
s = "leetcode",
dict = ["leet", "code"].

Return true because "leetcode" can be segmented as "leet code".

UPDATE (2017/1/4):
The wordDict parameter had been changed to a list of strings (instead of a set of strings).
Please reload the code definition to get the latest changes.

https://leetcode.com/problems/word-break/description/
https://www.programcreek.com/2012/12/leetcode-solution-word-break/
https://youtu.be/WepWFGxiwRs
*/

// BFS
// Time O(n^3)
// Space O(n^3)
var wordBreak = function(s, wordDict) {
  let set = new Set(wordDict);
  let queue = [];
  let visited = new Set();
  
  queue.push(0);
  while(queue.length) {
      let start = queue.shift();
      if(visited.has(start)) {
          continue;
      }
      // + 1 because it's exclusive
      for(let i = start + 1; i < s.length + 1; i++) {
          if(set.has(s.substring(start, i))) {
              queue.push(i);
              if(i === s.length) {
                  return true;
              }
          }
      }
      visited.add(start);
  }
  return false;
};

/*
function wordBreak(str, array) {
  let dp = new Array(str.length + 1).fill(false);
  // Initial state
  dp[0] = true;
  for(let i = 0; i < str.length; i++) {
      for(let j = 0; j <= i; j++) {
          if(!dp[j]) {
              continue;
          }
          // if i = 3, j will be 0, 1, 2, 3
          if(array.includes(str.substring(j, i + 1))) {
              dp[i + 1] = true;
              break;
          }
      }
  }
  // The last element will be the result
  return dp[str.length];
}
*/

/*
// Recursion approach
/*
                    WB[code]
  c && WB[ode]     co && WB[de]       cod && WB[e]         code && WB[] = true
// O(2^n)
https://www.youtube.com/watch?v=hLQYQ4zj0qg
*/
/*
var wordBreak = function(s, wordDict) {
  const map = {}
  function run(s) {
      if (map.hasOwnProperty(s)) {
          return map[s]
      } else if (s=='') {
          return true
      }
      for (let i=0;i<=s.length;i++) {
          if (
              wordDict.includes(s.slice(i)) &&
              run(s.slice(0, i))
          ){
              map[s] = true
              return true
          }
      }
      map[s] = false
      return false
  }
  return run(s)
};
*/

// Time O(n^2)
function wordBreak(str, array) {
  return helper(str, array, 0);
}

function helper(str, array, start) {
  // We found the string
  if(start === str.length) {
    return true;
  }
  // Check the values in the array
  for(let i = 0; i < array.length; i++) {
    let word = array[i];
    let len = word.length;

    // end should be less than the str length cause we can not create it
    if(start + len > str.length) {
      // Check the next word in the array
      continue;
    }

    if(str.substring(start, start + len) === word) {
      if(helper(str, array, start + len)) {
        return true;
      }
    }
  }
  return false;
}

// Time complexity O(n^2)
// DP.
function wordBreak(str, array) {
  let dp = new Array(str.length + 1).fill(false);
  // Set the initial state as true to have a state
  dp[0] = true;

  for(let i = 0; i < str.length; i++) {
    // We should only be interested in matches position
    if(!dp[i]) {
      continue;
    }
    for(let j = 0; j < array.length; j++) {
      let word = array[j];
      let len = word.length;
      let end = i + len;

      // We are only interested in those whom can create it
      if(end > str.length) {
        continue;
      }

      // If we already have a match, there´s no need to check again
      if(dp[end]) {
        continue;
      }

      if(str.substring(i, i + len) === word) {
        dp[i + len] = true;
      }

    }
  }
  return dp[str.length];
}

str = 'leetcode';
dict = ['leet', 'code'];
console.log(wordBreak(str, dict));

// O(n^2) en tiempo y memoria O(n)
// Best option.
function wordBreak(str, dict) {
  let n = str.length;
  if(!str || n === 0) {
    return false;
  }

  let dp = new Array(n+1).fill(false);
  dp[0] = true;

  for(let i = 1; i < n+1; i++) {
    for(let j = 0; j <= i; j++) {
      // El dp[j] nos ayuda a identificar si las partes anteriores fueron encontradas,
      // el substring como es 0 based nos ayuda a recortar la cadena correcta
      if(dp[j] && dict.includes(str.substring(j,i))) {
        dp[i] = true;
        break;
      }
    }
  }

  console.log(dp);
  return dp[n];
}

var wordBreak = function(str, dic) {
  let pos = new Array(str.length+1).fill(-1);
  pos[0]=0;
  for(let i = 0; i < str.length; i++){
      if(pos[i] !== -1){
          for(let j = i + 1; j <= str.length; j++){
              let sub = str.substring(i, j);
              if(dic.indexOf(sub) >= 0){
                  pos[j]=i;
              }
          } 
      }
  }
  /*Si el final es distinto de cero entonces hemos formado
  la palabra*/
  return pos[str.length] !== -1;
};

s = "leetcode";
dict = ["leet", "code"];
console.log(wordBreak(s,dict));
