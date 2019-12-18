/*

Given head which is a reference node to a singly-linked list. The value of each node in the linked list is either 0 or 1. The linked list holds the binary representation of a number.

Return the decimal value of the number in the linked list.

Example 1:


Input: head = [1,0,1]
Output: 5
Explanation: (101) in base 2 = (5) in base 10
Example 2:

Input: head = [0]
Output: 0
Example 3:

Input: head = [1]
Output: 1
Example 4:

Input: head = [1,0,0,1,0,0,1,1,1,0,0,0,0,0,0]
Output: 18880
Example 5:

Input: head = [0,0]
Output: 0

https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer/
*/

var getDecimalValue = function(head) {
    let count = -1;
    let sum = 0;
   
    let temp = head;
    while(temp !== null){  //this while loop is used to count number of nodes
        temp = temp.next;
        count++;
    }
   
    temp = head;
    for(let i = count; i >= 0; i--){ //this loop is used to do the calculation
        sum += temp.val * Math.pow (2,i) // val of node * 2 to the power of count
        temp = temp.next;
    }
       
    return sum;
};