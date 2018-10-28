/*
Given two strings S and T, determine if they are both one edit distance apart.
*/

//O(N)

function onEditDistance(s1,s2) {
    let len1 = s1.length;
    let len2 = s2.length;
  
    let len = Math.min(len1,len2);
  
    for(let i = 0; i < len; i++) {
        // Check only those who are different
        if(s1[i] !== s2[i]) {
            // Replace case, delete the diff char in both string
            if(len1 === len2) {
                return s1.substring(i+1) === s2.substring(i+1);
            } else if(len1 < len2) { // Delete one char from s2
                return s1.substring(i) === s2.substring(i+1);
            } else { // Delete one char from s1
                return s1.substring(i+1) === s2.substring(i);
            }
        }
    }
  
  return Math.abs(len1 - len2) === 1; // Corner case: ""
  
}

s1 = "ab";
s2 = "aa";

console.log(onEditDistance(s1,s2));
