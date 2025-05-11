/*
Given a string, generate all its substrings
Example: 456 substrings are => 4, 45, 456, 5, 56, 6
*/
// Time complexity: O(n^2)
// Space complexity: O(n^2) for storing substrings
// where n is the length of the string
// It cannot be improved the time complexity because we need to generate all substrings
function generateSubstrings(str) {
    const result = [];
    const length = str.length;

    // Generate all substrings
    for (let i = 0; i < length; i++) {
        for (let j = i + 1; j < length + 1; j++) {
            result.push(Number(str.substring(i, j)));
        }
    }
    return result;
}

console.log(generateSubstrings("456")); // ["4", "45", "456", "5", "56", "6"]
console.log(generateSubstrings("6666")); // ['6',    '66', '666', '6666', '6',  '66', '666',  '6',  '66', '6']
