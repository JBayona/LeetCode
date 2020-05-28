/*
Given a non negative integer number num. For every numbers i in the range 0 ≤ i ≤ num calculate the number of 1's in their binary representation and return them as an array.

Example 1:

Input: 2
Output: [0,1,1]
Example 2:

Input: 5
Output: [0,1,1,2,1,2]

https://leetcode.com/problems/counting-bits/
*/

/*
Concept: Let, n>=0 and j=2^n and k=(2^(n+1))-1, for i in [j,k], ans[i]=1+ans[i-(2^n)]. Base case ans[0]=0. This is the equation.
Explanation: For every number between j and k, as mentioned above, we have all the
other bits(except the most significant bit) repeated from the previous 2^n numbers in the same sequence. Suppose n=2, so j=4 and k=7. So we have, number of set bits in,

number of set bits in(4) = 1+number of set bits in(0);
number of set bits in(5) = 1+number of set bits in(1);
number of set bits in(6) = 1+number of set bits in(2);
number of set bits in(7) = 1+number of set bits in(3);
*/
var countBits = function(num) {
    let ans = new Array(num + 1).fill(0);
    ans[0]=0;
    let k = 0;
    let i = 1;
    let j;
    while(i <= num){
        j=0;
        while(i <= num && j<=k) {
            ans[i++]=ans[j++]+1;
        }
        k = i - 1;
    }
    return ans;
};