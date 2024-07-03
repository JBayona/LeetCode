/*
Two strings, X and Y, are considered similar if either they are identical or we can make them equivalent by
swapping at most two letters (in distinct positions) within the string X.

For example, "tars" and "rats" are similar (swapping at positions 0 and 2), and "rats" and "arts" are similar
but "star" is not similar to "tars", "rats", or "arts".

Together, these form two connected groups by similarity: {"tars", "rats", "arts"} and {"star"}.  Notice that "tars"
and "arts" are in the same group even though they are not similar.  Formally, each group is such that a word is in the group if and only if it is similar to at least one other word in the group.

We are given a list strs of strings where every string in strs is an anagram of every other string in strs.
How many groups are there?

Example 1:
Input: strs = ["tars","rats","arts","star"]
Output: 2

Example 2:
Input: strs = ["omv","ovm"]
Output: 1

https://leetcode.com/problems/similar-string-groups/description/
*/

// Time O(N) worst case, it can be optimized to O(LogN)
// Space O(N)
var numSimilarGroups = function(arr) {
    let parent = {};
    // Set init parents, we only care on the indexes
    for (let i = 0; i < arr.length; i++) {
        parent[i] = i;
    }

    // parent: {0: 1, 1: 2, 3:2} words and its index
    
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            // We compare if we have more than two different chars, if not
            // we apply union find using the indexes
            if (isSimilar(arr[i], arr[j])) {
                union(i, j, parent);
            }
        }
    }

    // We can optimize this by reducing "n" everytime we make an union
    // and we find that the parents of A and B in union are different, we
    // decrement n--. That way we will have the number of groups optimized
    // originally "n" would be the number of strings in the array
    let groups = new Set();
    for (let key in parent) {
        let parentTmp = findParent(parent[key], parent);
        if (!groups.has(parentTmp)) {
            groups.add(parentTmp);
        }
    }
    return groups.size;
};

// Check if 2 strings are different at less than 2 positions or not
function isSimilar(a, b) {
    if (a === b) {
        return true;
    }
    let count = 0;
    for (let i = 0; i < a.length; i++){
        if (a[i] !== b[i]) {
            count++;
        }
        if (count > 2) {
            return false;
        }
    }
    return true;
}

function union(nodeA, nodeB, parent) {
    let parentA = findParent(nodeA, parent);
    let parentB = findParent(nodeB, parent);
    parent[parentB] = parentA;
}

function findParent(node, parent) {
    if (parent[node] === node) {
        return node;
    }
    return findParent(parent[node], parent);
}