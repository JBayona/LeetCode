/*
Longest Common Substring
http://www.geeksforgeeks.org/longest-common-substring/
*/

function LCSubstr(x,y){
  //DP table
  let table = [];
  let max = 0;
  let flag = false;
  let init,end;
  for(let i = 0; i < x.length + 1; i++){
    table[i] = new Array(y.length + 1);
  }

  //DP
  for(let i = 0; i <= x.length; i++){
    for(let j = 0; j <= y.length; j++){
      if(i === 0 && j === 0){
        table[i][j] = 0;
      }else if(x[i-1] === y[j-1]){
        if(!flag){
          flag = true;
          init = i;
        }
        table[i][j] = table[i-1][j-1] + 1;
        if(table[i][j] > max){
          max = table[i][j];
          end = i;
        }
      }else{
        table[i][j] = 0;
      }
    }
  }
  console.log(table);
  console.log(x.slice(init-1, end));
  return max;
}

x = 'OldSite:GeeksforGeeks.org';
y = 'NewSite:GeeksQuiz.com';
console.log(LCSubstr(x,y));