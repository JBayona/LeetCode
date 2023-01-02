/*
Given an unsorted list of nodes. The task is to remove duplicates from the list. 

Examples:
Input: linked list = 12->11->12->21->41->43->21 
Output: 12->11->21->41->43. 
Explanation: Second occurrence o 12 and 21 is removed

Input: linked list = 12->11->12->21->41->43->21 
Output: 12->11->21->41->43. 
*/

// Time O(N)
// Space O(N)
let removeDuplicates = function (head) {
  let hash = {};
  let current = head;
  let prev = null;

  while (current) {
    let val = current.data;
    if (val in hash) {
      prev.next = current.next || null;
    } else {
      hash[val] = true;
      prev = current;
    }
    current = current.next;
  }
  return head;
};
