/*
You have an array of logs.  Each log is a space delimited string of words.

For each log, the first word in each log is an alphanumeric identifier.  Then, either:

Each word after the identifier will consist only of lowercase letters, or;
Each word after the identifier will consist only of digits.
We will call these two varieties of logs letter-logs and digit-logs.  It is guaranteed that each log has at least one word after its identifier.

Reorder the logs so that all of the letter-logs come before any digit-log.  The letter-logs are ordered lexicographically ignoring identifier, with the identifier used in case of ties.  The digit-logs should be put in their original order.

Return the final order of the logs.

 

Example 1:

Input: logs = ["dig1 8 1 5 1","let1 art can","dig2 3 6","let2 own kit dig","let3 art zero"]
Output: ["let1 art can","let3 art zero","let2 own kit dig","dig1 8 1 5 1","dig2 3 6"]

https://leetcode.com/problems/reorder-data-in-log-files/
*/

var reorderLogFiles = function(logs) {
    let arrayLetters = [];
    let arrayNumbers = [];
    
    
    // Identify logs based on identifiers
    for(let i = 0; i < logs.length; i++) {
        let tmp = logs[i].split(' ');
        if(!isNaN(tmp[1])) {
            arrayNumbers.push(logs[i]);
        } else {
            arrayLetters.push(logs[i]);
        }
    }
    
    // Custom comparator
    arrayLetters.sort((firstWord, secondWord) => {
        let firstArray = firstWord.split(' ');
        let secondArray = secondWord.split(' ');
        
        let firstId = firstArray.slice(1).join('-');
        let secondId = secondArray.slice(1).join('-');
        
        if(firstId < secondId) {
            return -1;
        } else if(secondId < firstId) {
            return 1;
        } else if(firstId == secondId) {
            // If both are equals, use key part of the tie
            let key1Sorted = firstArray[0].split(' ').sort();
            let key2Sorted = secondArray[0].split(' ').sort();
            if(key1Sorted < key2Sorted) {
                return -1;
            } else {
                return 1;
            }
        }
        return 0;
    });
    
    // Form the result
    let result = [];
    for(let i = 0 ; i < arrayLetters.length; i++) {
        result.push(arrayLetters[i]);
    }
    for(let i = 0 ; i < arrayNumbers.length; i++) {
        result.push(arrayNumbers[i]);
    }
    return result;
};