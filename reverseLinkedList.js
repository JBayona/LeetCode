/*
Reverse Linked List
*/

function ListNode(val, next) {
  this.val = val;
  this.next = next || null;
}

// Iterative
// Time O(N)
function reverseList(list) {
  let current = list;
  let prev = null;
  let next;

  while (current) {
    next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}

// Recursive
/*
1 -> 2 -> 3 -> 4 -> 5
1 -> 2 -> 3 -> 4 -> 5 
               ^   /
                \ /
1 -> 2 -> 3 -> 4   5
               ^   /
                \ /
1 -> 2 -> 3     4   5
           ^   /^  /
            \ /  \ /
*/
let reverse = function (head) {
  //  no need to reverse if head is null
  //  or there is only 1 node.
  if (!head || !head.next) {
    return head;
  }

  // Recursive call
  let reversedHead = reverse(head.next);

  // Reverse the direction of the next pointer of the last element
  // of the un-reversed part of the list, so that it points back
  // to the second-last element"

  head.next.next = head;
  // Set the second-last node as the new last element of the
  // un-reversed part of the list
  head.next = null;

  return reversedHead;
};

/*var reverseList = function(head) {
  if(!head || !head.next) {
      return head;
  }
  let t = head;
  head = head.next;
  t.next = null;
  let e = reverseList(head);
  head.next = t;
  return e;
};

// Recursive
var reverseList = function(head) {
  // Check if we have more than one node
  if(head && head.next) {
    let next = head.next;
    head.next = null;
    return reverse(next, head);
  }
  return head;
};

function reverse(node, prev) {
  // If node is null
  if(!node) {
    return prev;
  }
  let next = node.next;
  node.next = prev;
  return reverse(next, node);
}*/

list = new ListNode(
  1,
  new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
);
// console.log(reverseList(list));
console.log(reverse(list));
