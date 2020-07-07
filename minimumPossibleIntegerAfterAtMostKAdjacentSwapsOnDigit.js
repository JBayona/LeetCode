/*
Given a string num representing the digits of a very large integer and an integer k.

You are allowed to swap any two adjacent digits of the integer at most k times.

Return the minimum integer you can obtain also as a string.

Example 1:

Input: num = "4321", k = 4
Output: "1342"
Explanation: The steps to obtain the minimum integer from 4321 with 4 adjacent swaps are shown.
Example 2:

Input: num = "100", k = 1
Output: "010"
Explanation: It's ok for the output to have leading zeros, but the input is guaranteed not to have any leading zeros.
Example 3:

Input: num = "36789", k = 1000
Output: "36789"
Explanation: We can keep the number without any swaps.
Example 4:

Input: num = "22", k = 22
Output: "22"
Example 5:

Input: num = "9438957234785635408", k = 23
Output: "0345989723478563548"

https://leetcode.com/problems/minimum-possible-integer-after-at-most-k-adjacent-swaps-on-digits/
*/

var minInteger = function(num, k) {
    let arr = num.split("");
    let n = arr.length;
    for (let i = 0; i < n-1 && k > 0; i++) {
        let pos = i; 
        for (let j = i + 1; j < n ; j++) {
            // No more swaps available
            if (j - i > k) {
                break;
            }
            if (arr[j] < arr[pos]) {
                pos = j;
            }
        }
        for (let j = pos; j > i; j--) { 
            let temp = arr[j]; 
            arr[j] = arr[j - 1]; 
            arr[j - 1] = temp; 
        }
        // Update k swaps available
        k = k - (pos - i); 
    }
    return arr.join("");
};
