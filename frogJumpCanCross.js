/*
The thief has found himself a new place for his thievery again. There is only one entrance to this area, called the "root."
Besides the root, each house has one and only one parent house. After a tour, the smart thief realized that "all houses
in this place forms a binary tree". It will automatically contact the police if two directly-linked houses were broken
into on the same night.

Determine the maximum amount of money the thief can rob tonight without alerting the police.

Example 1:

Input: [3,2,3,null,3,null,1]

     3
    / \
   2   3
    \   \ 
     3   1

Output: 7 
Explanation: Maximum amount of money the thief can rob = 3 + 3 + 1 = 7.
Example 2:

Input: [3,4,5,1,3,null,1]

     3
    / \
   4   5
  / \   \ 
 1   3   1

Output: 9
Explanation: Maximum amount of money the thief can rob = 4 + 5 = 9.

https://leetcode.com/problems/house-robber-iii/
*/

var rob = function(root) {
    // Using the root
    let op1 = robHelper(root, true);
    // Not using the root
    let op2 = robHelper(root, false);
    return Math.max(op1, op2);
};

function robHelper(root, flag) {
    if(!root) {
        return 0;
    }
    
    // If we use the root, then the next we are not able to use the next left and right values
    if(flag) {
        return root.val + robHelper(root.left, !flag) + robHelper(root.right, !flag);
    } else {
        // Otherwhise we want the max of using or node using the left and right branches
        let leftMax = Math.max(robHelper(root.left, !flag), robHelper(root.left, flag));
        let rightMax = Math.max(robHelper(root.right, !flag), robHelper(root.right, flag));
        // We should just return that
        return leftMax + rightMax;
    }
}