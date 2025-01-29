/*
Merge k sorted linked lists and return it as one sorted list. Analyze and describe its complexity.

Example:
Input:
[
  1->4->5,
  1->3->4,
  2->6
]
Output: 1->1->2->3->4->4->5->6

https://leetcode.com/problems/merge-k-sorted-lists/description/
*/

// Time O(N Log K)
// Space O(1)
var mergeKLists = function(lists) {
  // Min heap
  let heap = new PriorityQueue({
      compare: (a, b) => a.val - b.val
  });

  // Iterate the first node for each list, we know that each node has
  // a reference to the next nodes with the "next" pointer, so we have
  // everything. We need to get one by one and traverse
  for (let list of lists) {
      if (list) {
          heap.enqueue(list);
      }
  }

  let head = new ListNode(0);
  let current = head;
  while (!heap.isEmpty()) {
      // This will get the smaller node so we need to add it
      let node = heap.dequeue();
      current.next = new ListNode(node.val);
      // Move the list
      current = current.next;
      // Move the node, as they are already sorted
      // and if it's not null, push it again to the heap
      node = node.next;
      if (node) {
          heap.enqueue(node);
      }
  }
  return head.next;
};


// O(nk Log k)
public class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
      if (lists.length == 0) return null;
      // Minheadp (El nodo es menor o igual al de sus hijos)
      PriorityQueue<ListNode> queue = new PriorityQueue<>(lists.length, (x, y) -> x.val - y.val);
      // push the head nodes of all the k lists in 'pq'  
      for (ListNode node : lists) {
          if (node != null) {
              queue.add(node);
          } 
      }

      // Nodo temporal
      ListNode head = new ListNode(0);
      ListNode current = head;
      // Mientras tengamos elementos en la pq
      while (!queue.isEmpty()) {
        // Saca el menor
        ListNode node = queue.poll();
        current.next = node;
        // Recorremos
        current = current.next;
        // Agregamos el next de nuestro nodo actual a la pq
        if (node.next != null) {
            queue.add(node.next);
        }
      }
      return head.next;
    }
}
