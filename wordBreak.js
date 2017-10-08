/*
Given a non-empty string s and a dictionary wordDict containing a list of non-empty words, determine if s can be segmented into a 
space-separated sequence of one or more dictionary words. You may assume the dictionary does not contain duplicate words.

For example, given
s = "leetcode",
dict = ["leet", "code"].

Return true because "leetcode" can be segmented as "leet code".

UPDATE (2017/1/4):
The wordDict parameter had been changed to a list of strings (instead of a set of strings). Please reload the code definition to 
get the latest changes.

https://leetcode.com/problems/word-break/description/
https://www.programcreek.com/2012/12/leetcode-solution-word-break/
*/

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