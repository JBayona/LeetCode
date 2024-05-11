/*
You are given the head of a non-empty linked list representing a
non-negative integer without leading zeroes.

Return the head of the linked list after doubling it.

Example 1:
Input: head = [1,8,9]
Output: [3,7,8]
Explanation: The figure above corresponds to the given linked list which represents the number 189.
Hence, the returned linked list represents the number 189 * 2 = 378.

Example 2:
Input: head = [9,9,9]
Output: [1,9,9,8]
Explanation: The figure above corresponds to the given linked list which represents the number 999.
Hence, the returned linked list reprersents the number 999 * 2 = 1998. 

https://leetcode.com/problems/double-a-number-represented-as-a-linked-list/description/?envType=daily-question&envId=2024-05-07
*/

// Time O(N)
var doubleIt = function (head) {
  // Reverse List
  let reversed = reverse(head);
  // Double the list
  let doubled = double(reversed);
  // Return it formatted
  return reverse(doubled);
};

function double(list) {
  let current = list;
  let isCarry = false;
  let prev = null;
  while (current) {
    // Double the number and plus the carry if any.
    let doubled = current.val * 2 + (isCarry ? 1 : 0);
    // Only set the decimal part if number is greater or equal than 10
    current.val = doubled % 10;
    // Check if we need to carry for the next iteration
    isCarry = doubled >= 10 ? true : false;
    // Same the prev
    prev = current;
    current = current.next;
  }
  // Set the latest carry from the list
  if (isCarry) {
    prev.next = new ListNode(1);
  }
  return list;
}

function reverse(list) {
  let current = list;
  let prev = null;
  let next = null;
  while (current) {
    let next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}
