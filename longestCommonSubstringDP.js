/*
Longest Common Substring
http://www.geeksforgeeks.org/longest-common-substring/
https://www.youtube.com/watch?v=BysNXJHzCEs
*/

function longestCommonSubstring(str1, str2) {
  let dp = new Array(str2.length + 1);
  let max = 0;
  let result = [];

  for(let i = 0; i < dp.length; i++) {
    dp[i] = new Array(str1.length+1);
  }

  for(let i = 0; i < dp.length; i++) {
    dp[i][0] = 0; 
  }

  for(let i = 0; i < dp[0].length; i++) {
    dp[0][i] = 0;
  }

  for(let i = 1; i < dp.length; i++) {
    for(let j = 1; j < dp[i].length; j++) {
      if(str1[i-1] === str2[j-1]) {
        dp[i][j] = dp[i-1][j-1] + 1;
        if(dp[i-1][j-1] + 1 > max) {
          max = dp[i-1][j-1] + 1;
        }
      } else {
        dp[i][j] = 0;
      }
    }
  }

  //Get string
  let tmp = max
  while(tmp > 0) {
    // Aquí no importa cuál se use
    result.unshift(str1[tmp--]);
  }

  console.log(max);
  console.log(result.join(''));
}

str1 = "abcdaf";
str2 = "3bcdf";
console.log(longestCommonSubstring(str1, str2));