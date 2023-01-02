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

// Option 2
// Time O(N^2)
/*
 * Function to remove duplicates from an unsorted linked list
 */
function remove_duplicates() {
  let ptr1 = null;
  let ptr2 = null;
  let dup = null;
  let ptr1 = head;

  /* Pick elements one by one */
  while (ptr1 != null && ptr1.next != null) {
    ptr2 = ptr1;
    /*
     * Compare the picked element with rest of the elements
     */
    while (ptr2.next != null) {
      /* If duplicate then delete it */
      if (ptr1.data == ptr2.next.data) {
        /* sequence of steps is important here */
        dup = ptr2.next;
        ptr2.next = ptr2.next.next;
      } /* This is tricky */ else {
        ptr2 = ptr2.next;
      }
    }
    ptr1 = ptr1.next;
  }
}
