/*
Implement the following operations of a stack using queues.

push(x) -- Push element x onto stack.
pop() -- Removes the element on top of the stack.
top() -- Get the top element.
empty() -- Return whether the stack is empty.
Example:

MyStack stack = new MyStack();

stack.push(1);
stack.push(2);  
stack.top();   // returns 2
stack.pop();   // returns 2
stack.empty(); // returns false
Notes:

You must use only standard operations of a queue -- which means only push to back, peek/pop from front, size, and is empty operations are valid.
Depending on your language, queue may not be supported natively. You may simulate a queue by using a list or deque (double-ended queue), 
as long as you use only standard operations of a queue.
You may assume that all operations are valid (for example, no pop or top operations will be called on an empty stack).

https://leetcode.com/problems/implement-stack-using-queues/description/
*/

// Push O(N) y pop()/top() O(1)
/**
 * Initialize your data structure here.
 */
var MyStack = function() {
  this.queue1 = [];
  this.queue2 = [];
};

// basically the idea is to change everytime the queues as stack and queue are the 
// same but follow an opposite order

/**
 * Push element x onto stack. 
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function(x) {
  // Insert in queue2
  // This queue at this point will always be empty
  this.queue2.push(x);
  
  while(this.queue1.length) {
      this.queue2.push(this.queue1.shift());
  }
  
  let tmp = this.queue1;
  this.queue1 = this.queue2;
  this.queue2 = tmp;
};

/**
 * Removes the element on top of the stack and returns that element.
 * @return {number}
 */
MyStack.prototype.pop = function() {
  if(!this.queue1.length) {
      return;
  }
  return this.queue1.shift();
};

/**
 * Get the top element.
 * @return {number}
 */
MyStack.prototype.top = function() {
  if(!this.queue1.length) {
      return;
  }
  return this.queue1[0];
};

/**
 * Returns whether the stack is empty.
 * @return {boolean}
 */
MyStack.prototype.empty = function() {
  return this.queue1.length === 0;
};

/** 
 * Your MyStack object will be instantiated and called as such:
 * var obj = Object.create(MyStack).createNew()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */



 // Push constante O(1) y pop()/top() O(N)
/**
 * Initialize your data structure here.
 */
var MyStack = function() {
  this.queue1 = [];
  this.queue2 = [];
  this.size = 0;
};

// basically the idea is to change everytime the queues as stack and queue are the 
// same but follow an opposite order

/**
 * Push element x onto stack. 
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function(x) {
  this.size++;
  this.queue1.push(x);
};

/**
 * Removes the element on top of the stack and returns that element.
 * @return {number}
 */
MyStack.prototype.pop = function() {
    
  if(!this.queue1.length) {
      return;
  }
  
  // Leave on element on q1 an the rest push them to q2
  while(this.queue1.length !== 1) {
      this.queue2.push(this.queue1.shift());
  }
  
  // Here in order to not modify the result after the swap
  let pop = this.queue1.shift();
  
  // Swap
  let tmp = this.queue1;
  this.queue1 = this.queue2;
  this.queue2 = tmp;
  
  this.size--;
  
  return pop;
};

/**
 * Get the top element.
 * @return {number}
 */
MyStack.prototype.top = function() {
  if(!this.queue1.length) {
      return;
  }
  
  // Leave on element on q1 an the rest push them to q2
  while(this.queue1.length !== 1) {
      this.queue2.push(this.queue1.shift());
  }
  
  let top = this.queue1.shift();
  
  // Insert into queue2 as we don't want it to remove
  this.queue2.push(top);
  
  // Swap
  let tmp = this.queue1;
  this.queue1 = this.queue2;
  this.queue2 = tmp;
  
  return top;
};

/**
 * Returns whether the stack is empty.
 * @return {boolean}
 */
MyStack.prototype.empty = function() {
  return this.size === 0;
};

/** 
 * Your MyStack object will be instantiated and called as such:
 * var obj = Object.create(MyStack).createNew()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */