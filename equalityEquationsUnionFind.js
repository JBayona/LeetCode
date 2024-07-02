/*
You are given an array of strings equations that represent relationships between variables where each string equations[i] is of length 4 and takes one of two different forms: "xi==yi" or "xi!=yi".Here, xi and yi are lowercase letters (not necessarily different) that represent one-letter variable names.

Return true if it is possible to assign integers to variable names so as to satisfy all the given equations, or false otherwise.

Example 1:
Input: equations = ["a==b","b!=a"]
Output: false
Explanation: If we assign say, a = 1 and b = 1, then the first equation is satisfied, but not the second.
There is no way to assign the variables to satisfy both equations.

Example 2:
Input: equations = ["b==a","a==b"]
Output: true
Explanation: We could assign a = 1 and b = 1 to satisfy both equations.

https://leetcode.com/problems/satisfiability-of-equality-equations/description/?envType=study-plan-v2&envId=graph-theory
*/
// Time O(N) worst case, it can be optimized to O(LogN)
// Space O(N)
var equationsPossible = function(equations) {
    let parent = {};
    // Create initial structure
    for (let eq of equations) {
        let a = eq[0];
        if (!(a in parent)) {
            parent[a] = a
        };

        let b = eq[eq.length - 1];
        if (!(b in parent)) {
            parent[b] = b
        };
    }

    // Union find
    for (equation of equations) {
        let a = equation[0];
        let b = equation[equation.length - 1];
        // The second opetator is always "=", the first
        // operator can be either = or !, if it's "=" we need
        // to join them
        let sign = equation[1];
        if (sign === '=') {
            union(a, b, parent);
        }
    }

    // Validate result if equations are valid and fine
    for (let equation of equations) {
        let a = equation[0];
        let b = equation[equation.length - 1];

        let sign = equation[1];
        let parentA = findParent(a, parent);
        let parentB = findParent(b, parent);
        
        //  If the variables are the same, both should come from
        // the same parent
        if (sign === '=' && parentA !== parentB) {
            return false;   
        } else if (sign === '!' && parentA === parentB) { // otherwise parents should be different
            return false;
        }
    }
    return true;
};

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
