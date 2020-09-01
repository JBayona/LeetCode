// Intersection of sorted lists.

function Node(val, next) {
  this.val = val;
  this.next = next || null;
}

var getIntersectionNode = function(headA, headB) {
  let listA = headA;
  let listB = headB;

  while(listA && listB) {
    if(listA.val < listB.val) {
      listA = listA.next;
    } else if(listB.val < listB.val) {
      listB = listB.next;
    } else {
      // Both are equals
      let tmp = listA;
      tmp.next = null;
      return tmp;
    }
  }
  return null;
}


listA = new Node(1, new Node(2, new Node(4, new Node(5, new Node(9, new Node(11))))));
listB = new Node(5, new Node(10, new Node(12)));
console.log(getIntersectionNode(listA, listB));
