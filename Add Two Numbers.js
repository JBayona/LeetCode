/*
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 0 -> 8
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    var val = 0,
        newHead,
        newTail,
        node;
    
    if (!l1) {
        return l2;
    }
    
    if (!l2) {
        return l1;
    }
    
    while (l1 && l2) {
		//En la primera iteracion comienza con el primer elemento de la lista
		//+= del val porque consideramos el carry
        val += l1.val + l2.val;
		//No queremos numero mayores a 10, por eso sacamos el modulo, nuevo nodo
        node = new ListNode(val % 10);
        
        if (newHead) {
            newTail.next = node;
            newTail = newTail.next; //Esta variable tiene el ultimo nodo
        } else {
			//En la primera iteracion newHead no esta definido y a partir de ese elemento
			//Comenzamos a crear los nodos
            newHead = node;
            newTail = node;
        }
        
		//Esta verificamos es para contar el acarreo
        val = (val >= 10)? 1 : 0;
		//Avanzaremos hasta que sea null y ya no entremos al while
        l1 = l1.next;
        l2 = l2.next;
    } //Hasta este punto ya tenemos formado nuestra lista con la suma
    
    while (l1) {
        val += l1.val;
        node = new ListNode(val % 10);
        newTail.next = node;
        newTail = newTail.next;
        val = (val >= 10)? 1 : 0;
        l1 = l1.next;
    }
    
    while (l2) {
        val += l2.val;
        node = new ListNode(val % 10);
        newTail.next = node;
        newTail = newTail.next;
        val = (val >= 10)? 1 : 0;
        l2 = l2.next;
    }
    
    if (val > 0) {
        node = new ListNode(val);
        newTail.next = node;
    }
    
    return newHead;
};

function ListNode(val, node) {
  this.val = val;
  this.next = node ? node : null;
}

function ListNode2(val, node){
  this.val = val;
  this.next = node ? node : null;
}


l1 = new ListNode(2,new ListNode(4,new ListNode(3)));
l2 = new ListNode(5, new ListNode(6, new ListNode(4)));
//console.log(l1);
//console.log(l2);
console.log(addTwoNumbers(l1,l2));