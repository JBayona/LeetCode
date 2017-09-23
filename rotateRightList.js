/*
Given a list, rotate the list to the right by k places, where k is non-negative.

For example:
Given 1->2->3->4->5->NULL and k = 2,
return 4->5->1->2->3->NULL.

https://leetcode.com/problems/rotate-list/description/
*/

//Option 1 

function ListNode(val, next){
  this.val = val;
  this.next = next || null;
}

function getLength(head){
  let list = head;
  let len = 0;
  while(list){
    len++;
    list = list.next;
  }
  return len;
}

var rotateRight = function(head, k) {
    let len = getLength(head);
    //Get the k element in the list
    let index = ((len - k)%len + len)%len;
    //console.log(index);
    //Find the first element of the tree
    let list = head;
    let tmp = 0;
    let count = 0;
    let resultHead = null;
    let result = null;
    let flag = false;
    //Adding element while reach the number of lenght
    while(count < len){
      if(flag){
        //If we reach the last element lest start from 0
        if(!list){
          list = head;
        }
        if(list){
          result.next = new ListNode(list.val);
          result = result.next;
          count++;
        }
      }
      //Find the option of the first element
      if(tmp === index){
        resultHead = new ListNode(list.val);
        result = resultHead;
        count++;
        flag = true;
      }
      list = list.next;
      tmp++;
    }
    return resultHead;
};

list = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
k = 2;
console.log(rotateRight(list,k));

//Option 2

function ListNode(val, next){
  this.val = val;
  this.next = next || null;
}

var rotateRight = function(head, k) {
    var pointerA = head,
        pointerB = head,
        len = 0,
        newHead,
        i;
    
    if (head === null) {
        return null;
    }
    
    //Contamos el length de la lista
    while (pointerA) {
        pointerA = pointerA.next;
        len++;
    }
    
    //En caso de desbordar
    k = k % len;
    
    if (k === 0 || len === 1) {
        return head;
    }
    
    //Recorremos A k posiciones
    pointerA = head;
    for (i = 0; i < k; i++) {
        pointerA = pointerA.next;
    }
    
    /*Mientras tengamos A, posicionamos A en el 
    último elemento y vamos recorriendo B, estarán a
    k posiciones de distancia A de B*/
    while (pointerA && pointerA.next) {
        pointerA = pointerA.next;
        pointerB = pointerB.next;
    }
    
    //Formamos el resultado
    newHead = pointerB.next;
    pointerB.next = null;
    pointerA.next = head;
    
    return newHead;
};

list = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
k = 2;
console.log(rotateRight(list,k));