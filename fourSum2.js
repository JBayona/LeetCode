/*
Given four lists A, B, C, D of integer values, compute how many tuples (i, j, k, l)
there are such that A[i] + B[j] + C[k] + D[l] is zero.

To make problem a bit easier, all A, B, C, D have same length of N where
0 ≤ N ≤ 500. All integers are in the range of -228 to 228 - 1 and the result is
guaranteed to be at most 231 - 1.

Example:

Input:
A = [ 1, 2]
B = [-2,-1]
C = [-1, 2]
D = [ 0, 2]

Output:
2

Explanation:
The two tuples are:
1. (0, 0, 0, 1) -> A[0] + B[0] + C[0] + D[1] = 1 + (-2) + (-1) + 2 = 0
2. (1, 1, 0, 0) -> A[1] + B[1] + C[0] + D[0] = 2 + (-1) + (-1) + 0 = 0

https://leetcode.com/problems/4sum-ii/
*/

// Time O(N)
// Space O(N)
var fourSumCount = function(A, B, C, D) {
    let hash = {};
    for(let n1 of A) {
        for(let n2 of B) {
            let tmp = n1 + n2;
            // Track how many times we can find the sum based in the
            // first two arrays
            if(tmp in hash) {
             hash[tmp] += 1;   
            } else {
             hash[tmp] = 1;   
            }
        }
    }
    
    let count = 0;
    for(let n1 of C) {
        for(let n2 of D) {
            let tmp = n1 + n2;
            // Check if we have the number but in negative as we are
            // looking to make zero, in the value we are tracking how
            // many times we get that result.
            if(-tmp in hash) {
                count += hash[-tmp];
            }
        }
    }
    return count;
};

// Option 2

var fourSumCount = function(A, B, C, D) {
    return kSumCount([A, B, C, D]);
};

function kSumCount(lists) {
    let hash = {};
    addToHash(lists, hash, 0, 0);
    return countComplement(lists, hash, lists.length / 2, 0);
}

function addToHash(lists, hash, index, sum) {
    if(index === lists.length / 2) {
        if (sum in hash) {
            hash[sum]++;
        } else {
            hash[sum] = 1;
        }
    } else {
        for(let n of lists[index]) {
            addToHash(lists, hash, index + 1, sum + n);
        }
    }
}

function countComplement(lists, hash, index, complement) {
    if(index === lists.length) {
        return hash[complement] || 0;
    }
    let count = 0;
    for(let n of lists[index]) {
        count += countComplement(lists, hash, index + 1, complement - n);
    }
    return count;
}