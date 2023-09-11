/*
Problem: Design an algorithm to encode a list of strings to a string. The encoded string is
then sent over the network and is decoded back to the original list of strings. Please implement encode and decode

Example(s):

Example1
Input: [“lint”,“code”,“love”,“you”] Output: [“lint”,“code”,“love”,“you”] Explanation:
One possible encode method is: “lint:;code:;love:;you”

Example2
Input: [“we”, “say”, “:”, “yes”] Output: [“we”, “say”, “:”, “yes”] Explanation: One possible encode
method is: “we:;say:;:::;yes”

https://leetcode.com/problems/encode-and-decode-strings/
*/


function encode(strs) {
    let res = ''
    for (let word of strs) {
        let encoded = word.length + '/' + word;
        res += encoded;
    }
    return res;
}

function decode(str) {
    let index = 0;
    let result = [];
    while (index < len(str)) {
        let tmp = index;
        // Find slash
        while (tmp < str.length && str[tmp] !== '/'){
            tmp += 1;
        }
        let slash = tmp;
        // Get the size of the string
        let size = Number(str.substring(index, slash));
        let word = str.substring[slash + 1, slash + 1 + size];
        // Move index
        index = slash + 1 + size;
        result.push(word);
    return result;
    }
}


test = ["we", "say", ":", "yes"];
result = encode(test);
console.log(result);
console.log(decode(result));
