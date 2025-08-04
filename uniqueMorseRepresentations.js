/*
International Morse Code defines a standard encoding where each letter is mapped to a series of dots and dashes
as follows: "a" maps to ".-", "b" maps to "-...", "c" maps to "-.-.", and so on.

https://leetcode.com/problems/unique-morse-code-words/description/
*/
/**
 * @param {string[]} words
 * @return {number}
 */

 // Opción 1
var uniqueMorseRepresentations = function(words) {
    let hash = {};
    let morseCode;
    let count = 0;
    /*We store in a hash the morse code as key and as value the words that has that key morse*/
    for(let i = 0; i < words.length; i++) {
        morseCode = convertToMorse(words[i]);
        if(morseCode in hash) {
            hash[morseCode].push(words[i]);
        } else {
            hash[morseCode] = [words[i]];
            count++;
        }
    }
    console.log(hash);
    console.log(count);
    return count;
};

const convertToMorse = word => {
    let codes = [".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."];
    let str = '';
    for(let i = 0; i < word.length; i++) {
        str += codes[word[i].charCodeAt() - 97];
    }
    return str
}

words = ["gin", "zen", "gig", "msg"];
console.log(uniqueMorseRepresentations(words));

// Opción 2
var uniqueMorseRepresentations = function(words) {
    let transform = [];
    let codes = [".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."];
    for(let i = 0; i < words.length; i++) {
        transform.push(words[i].split('').map(char => codes[char.charCodeAt() - 97]).join(''));
    }
    //Convert the array in set to remove the duplicates
    return new Set(transform).size;
};

// Opción 3
var uniqueMorseRepresentations = function(words) {
	let codes = [".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."];
    return new Set(words.map(word => word.split('').map(char => codes[char.charCodeAt() - 97]).join(''))).size;
};
