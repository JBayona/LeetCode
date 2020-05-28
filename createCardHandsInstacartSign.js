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
                    validSuit(first, second, third) &&
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

function validSuit(a, b, c) {
    let tmp = [a[0], b[0], c[0]];
    // All equals
    let suit = new Set([...tmp]);

    return suit.size === 1 || suit.size === 3;
}

function validValues(a, b, c) {
    let valA = a[1];
    let valB = b[1];
    let valC = c[1];
    let tmp = [valA, valB, valC];

    let val = new Set([...tmp]);

    return val.size === 1 || val.size === 3;

}

function validCount(a, b, c) {
    let aStr = a.substring(1);
    let bStr = b.substring(1);
    let cStr = c.substring(1);
    let countA = getHashCount(aStr);
    let countB = getHashCount(bStr);
    let countC = getHashCount(cStr);
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

input = ['+AA', '-AA', '+AA', '-C', '-B', '+AA', '-AAA', '-A', '=AA', '+BB', '=CCC'];
// results ["+AA", "-AA", "=AA"], ["+AA", "+AA", "+AA"], ["-AA", "-AAA", "-A"],["-C", "-B", "-A"]
console.log(findHand(input));