/*
Given an input of cards that have suits { +, -, = }, values { A, B, C }, and different
counts of values [1 - 3]. Find a valid hand. A valid hand consists of 3 cards. Where all
the suits are different or the same, all the values are different or the same, and all
counts are different or the same.
*/
function findHand(input) {
    let result = [];
    let seen = new Set();
    for(let i = 0; i < input.length; i++) {
        let first = input[i];
        for(let j = i +1 ; j < input.length; j++) {
            let second = input[j];
            for(let k = j + 1; k < input.length; k++) {
                let third = input[k];
                if(
                    validValues(first, second, third) &&
                    validCount(first, second, third)
                ) {
                    let tmp = [first, second, third].sort();
                    let key = tmp.join('');
                    // Remove repeated results
                    if(!seen.has(key)) {
                        result.push([first, second, third]);
                    }
                    seen.add(key);
                }
            }
        }
    }
    return result;
}

function validValues(a, b, c) {
    let valA = a[0];
    let valB = b[0];
    let valC = c[0];
    let tmp = [valA, valB, valC];

    let val = new Set([...tmp]);

    return val.size === 1 || val.size === 3;

}

function validCount(a, b, c) {
    let countA = getHashCount(a);
    let countB = getHashCount(b);
    let countC = getHashCount(c);
    let tmp = [countA, countB, countC];

    let count = new Set([...tmp]);

    return count.size === 1 || count.size === 3;

}

function getHashCount(str) {
    let hash = {};
    let elem = '';
    for(let i = 0; i < str.length; i++) {
        elem = str[i];
        if(elem in hash) {
            hash[elem]++;
        } else {
            hash[elem] = 1;
        }
    }
    return hash[elem];
}

// input = ['A', 'C', 'C', 'C']; // result = ["C", "C", "C"]
// input = ['B', 'B', 'C', 'CC', 'A', 'AA']; // result = ["B", "C", "A"]
// input = ['A', 'B', 'BB', 'CC', 'CCC']; // result = ["A", "B", "CCC"]
// input = ['A', 'A', 'AA', 'B', 'AAA']; // result = ["A", "A", "AAA"]
input = ['A', 'B', 'B', 'B']; // result = ["B", "B", "B"]
console.log(findHand(input));