/*
Given an array of characters, compress it in-place.
The length after compression must always be smaller than or equal to the original array.
Every element of the array should be a character (not int) of length 1.

After you are done modifying the input array in-place, return the new length of the array. 
Follow up:
Could you solve it using only O(1) extra space?
 
Example 1:
Input:
["a","a","b","b","c","c","c"]

Output:
Return 6, and the first 6 characters of the input array should be: ["a","2","b","2","c","3"]

Explanation:
"aa" is replaced by "a2". "bb" is replaced by "b2". "ccc" is replaced by "c3".

https://leetcode.com/problems/string-compression/
*/

// Time O(N)
// Space O(1)
var compress = function(chars) {
    let index = 0;
    let indexWrite = 0;
    while (index < chars.length) {
        let c = chars[index];
        let count = 0;

        // Count the number of repeated chards.
        while (index < chars.length && chars[index] === c) {
            count++;
            index++;
        }
        // Write the char
        chars[indexWrite] = c;
        // Move to now write the number of frequency
        indexWrite++;
        if (count > 1) {
            // This will cover if we have strings with different sizes
            let str = count.toString();
            for (let i = 0; i < str.length; i++) {
                let d = str[i];
                chars[indexWrite] = d;
                indexWrite++;
            }
        }
    }
    return indexWrite;
};