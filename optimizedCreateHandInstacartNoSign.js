/*
Given an input of cards that have suits { +, -, = }, values { A, B, C }, and different
counts of values [1 - 3]. Find a valid hand. A valid hand consists of 3 cards. Where all
the suits are different or the same, all the values are different or the same, and all
counts are different or the same.
*/
// Approach, get string 1, string 2 and create the last string
// Finally check if that candidate is part of our input, if yes
// it means that we can have it as part of the response
// Time Complexity O(N^2)
function findHand(input) {
    let result = [];
    let seen = new Set();
    for(let i = 0; i < input.length; i++) {
        let first = input[i];
        for(let j = i +1 ; j < input.length; j++) {
            let second = input[j];
            let third = findCandidate(first, second);
            // Check if we have the element but for those not
            // visited before
            let arrayTmp = input.slice(j+1);
            let key = [first, second, third].sort().join('');
            if(arrayTmp.includes(third) && !seen.has(key)) {
                result.push([first, second, third]);
            }
            seen.add(key);
        }
    }
    return result;
}

function findCandidate(a,b) {
    let letter = getLetter(a,b);
    let count = getCount(a,b);

    return letter.repeat(count);
}

function getLetter(a, b) {
    // Letters start at 1 position as the first position
    // is for the sign
    let charA = a[0];
    let charB = b[0];

    // If both letters are the same, then our candidate should have
    // the same character
    if(charA == charB) {
        return charA
    } else {
        // Otherwise we need to find the char that's different
        let chars = ['A', 'B', 'C'];
        for(let c of chars) {
            if(c !== charA && c !== charB) {
                return c;
            }
        }
    }
}

function getCount(a, b) {
    let aCount = a.length;
    let bCount = b.length;

    let hashCount = {};
    // Save the first count
    hashCount[aCount] = 1;

    // If b has the same count, then our count
    // should be the same
    if(bCount in hashCount) {
        return aCount;
    } else {
        // Otherwise, all of them should be different
        hashCount[bCount] = 1;
        let count = [1, 2, 3];
        for(let freq of count) {
            if(!(freq in hashCount)) {
                return freq;
            }
        }
    }
}

//function getFrequency(str) {
    /*let hash = {};
    let elem = '';
    for(let i = 0; i < str.length; i++) {
        elem = str[i];
        if(elem in hash) {
            hash[elem]++;
        } else {
            hash[elem] = 1;
        }  
    }
    return hash[elem];*/
    // If all of those have the same char
    // then we can just return the length
//}


//input = ['+AA', '-AA', '+AA', '-C', '-B', '+AA', '-AAA', '-A', '=AA', '+BB', '=CCC'];
// results ["+AA", "-AA", "=AA"], ["+AA", "+AA", "+AA"], ["-AA", "-AAA", "-A"],["-C", "-B", "-A"] ["-A", "+BB", "=CCC"]
// input = ['A', 'C', 'C', 'C']; // result = ["C", "C", "C"]
// input = ['B', 'B', 'C', 'CC', 'A', 'AA']; // result = ["B", "C", "A"]
// input = ['A', 'B', 'BB', 'CC', 'CCC']; // result = ["A", "B", "CCC"]
input = ['A', 'A', 'AA', 'B', 'AAA']; // result = ["A", "B", "CCC"]
console.log(findHand(input));