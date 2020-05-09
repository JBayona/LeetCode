var user0 = ["/start", "/pink", "/register", "/orange", "/red", "a"];
var user1 = ["/start", "/green", "/blue", "/pink", "/register", "/orange", "/one/two"];
var user2 = ["a", "/one", "/two"];
var user3 = ["/pink", "/orange", "/yellow", "/plum", "/blue", "/tan", "/red", "/amber", "/HotRodPink", "/CornflowerBlue", "/LightGoldenRodYellow", "/BritishRacingGreen"];
var user4 = ["/pink", "/orange", "/amber", "/BritishRacingGreen", "/plum", "/blue", "/tan", "/red", "/lavender", "/HotRodPink", "/CornflowerBlue", "/LightGoldenRodYellow"];
var user5 = ["a"];


// Time O(N Log N)
function findContiguousHistory(u1, u2) {
  let tmp = u1.concat('$', u2);
  let n = tmp.length
  // console.log(tmp);
  
  // Build Suffix Array
  let sa = []
  for(let i = 0; i < tmp.length; i++) {
    sa[i] = i;
  }
  
  // Sort
  // Time O(N Log N) * O(N)
  sa.sort((i,j) => {
    for (let l=0; l<n; l++){
      if (i+l >= n) return -1;
      if (j+l >= n) return 1;
      if (tmp[i+l] == tmp[j+l]) continue;
      if (tmp[i+l] < tmp[j+l]) return -1;
      return 1;
    }
    return 0;
  });
  // console.log(sa);

  // Build Longest Common Prefix.

    let k=0;
    let lcp = new Array(n).fill(0);
    let rank = new Array(n).fill(0);
 
    for(let i=0; i<n; i++) rank[sa[i]]=i;
 
    for(let i=0; i<n; i++, k?k--:0) {
      if(rank[i]==n-1) {k=0; continue;}
      let j = sa[rank[i]+1];
      while(i+k<n && j+k<n && tmp[i+k]==tmp[j+k]) k++;
      lcp[rank[i]]=k;
    }
    let mx = 0;
    let u1Length = u1.length;
    let u22Length = u2.length;
    for (let i=1; i<n; i++) {
      if (lcp[i] >= lcp[mx] ) {
        if (lcp[i] == lcp[mx] && sa[mx] < sa[i]) continue
        mx = i;
      }
    }
    // console.log(lcp[mx], sa[mx])
    // console.log(lcp);
    // for (let i=0; i<lcp[mx]; i++) {
    //   console.log(tmp[sa[mx]+i])
    // }console.log(tmp);
    // sa[mx] = position of the first matching
    // lcp(longest common prefix)[mx] = how many matches we found 
    console.log(tmp.slice(sa[mx], sa[mx] + lcp[mx]));
}

findContiguousHistory(user0, user1); // ["/pink", "/register", "/orange"]
findContiguousHistory(user2, user5); // ["a"]
findContiguousHistory(user3, user4); // ["a"]