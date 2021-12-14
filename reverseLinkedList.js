/*
Reverse Linked List
*/

function ListNode(val, next){
  this.val = val;
  this.next = next || null;
}

// Iterative
// Time O(N)
function reverseList(list){
  let current = list;
  let prev = null;
  let next;

  while(current){
    next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}

// Recursive
var reverseList = function(head) {
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
}

list = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
console.log(reverseList(list));