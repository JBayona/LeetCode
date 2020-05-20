/*
Given a non-empty binary search tree and a target value, find the value in the BST that is closest to the target.

Note:

Given target value is a floating point.
You are guaranteed to have only one unique value in the BST that is closest to the target.
Example:

Input: root = [4,2,5,1,3], target = 3.714286

    4
   / \
  2   5
 / \
1   3

Output: 4
*/

// Time: O(log(n))
// Space: O(log(n))
function closestValue(root, target) {
    return closestValueHelper(root, target, NUMBER.MAX_SAFE_VALUE, -1);
}

function closestValueHelper(root, target, diff, min) {
    // The base case is that we return the minumum as the closest value
    if(root == null) {
        return min;
    }
    let currentDiff = Math.abs(root.val - target);
    // We found a new closest element
    if(currentDiff < diff) {
        diff = currentDiff;
        min = root.val;
    }
    // Is still less than the actual node, look for left
    if(target <= root.val) {
        return closestValueHelper(root.left, target, diff, min);
    }
    // Is greater than current node, look for right
    return closestValueHelper(root.right, target, diff, min);
}