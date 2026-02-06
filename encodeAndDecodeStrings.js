/*
Problem: Design an algorithm to encode a list of strings to a string. The encoded string is
then sent over the network and is decoded back to the original list of strings.
Please implement encode and decode

Example(s):

Example1
Input: [“lint”,“code”,“love”,“you”] Output: [“lint”,“code”,“love”,“you”] Explanation:
One possible encode method is: “lint:;code:;love:;you”

Example2
Input: [“we”, “say”, “:”, “yes”] Output: [“we”, “say”, “:”, “yes”] Explanation: One possible encode
method is: “we:;say:;:::;yes”

https://leetcode.com/problems/encode-and-decode-strings/
*/
/**
 * Encodes a list of strings to a single string.
 *
 * @param {string[]} strs
 * @return {string}
 */
// Time O(N)
// Space O(1)
var encode = function(strs) {
    let encoded = '';
    for (let str of strs) {
        encoded += (str.length + '/' + str);
    }
    return encoded;
};

/**
 * Decodes a single string to a list of strings.
 *
 * @param {string} s
 * @return {string[]}
 */
var decode = function(s) {
    let result = [];
    let index = 0;
    while (index < s.length) {
        let slash = Number(s.indexOf('/', index));
        let size = Number(s.substring(index, slash));
        // Where the word is
        index = slash + size + 1;
        result.push(s.substring(slash + 1, index));
    }
    return result;
};

/**
 * Your functions will be called as such:
 * decode(encode(strs));
 */
test = ["we", "say", ":", "yes"];
result = encode(test);
console.log(result);
console.log(decode(result));
