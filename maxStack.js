/*
Design a max stack data structure that supports the stack operations
and supports finding the stack's maximum element.

Implement the MaxStack class:

MaxStack() Initializes the stack object.
void push(int x) Pushes element x onto the stack.
int pop() Removes the element on top of the stack and returns it.
int top() Gets the element on the top of the stack without removing it.
int peekMax() Retrieves the maximum element in the stack without removing it.
int popMax() Retrieves the maximum element in the stack and removes it. If there is more than
one maximum element, only remove the top-most one.

https://leetcode.com/problems/max-stack/
*/

var MaxStack = function() {
  this.stack = [];
  this.maxStack = [];
};

/** 
* @param {number} x
* @return {void}
*/
MaxStack.prototype.push = function(x) {
  let currentMax = this.maxStack.length > 0 ? this.peekMax() : Number.NEGATIVE_INFINITY;
  let max = Math.max(currentMax, x);
  this.stack.push(x);
  this.maxStack.push(max);
};

/**
* @return {number}
*/
MaxStack.prototype.pop = function() {
  this.maxStack.pop();
  return this.stack.pop();
};

/**
* @return {number}
*/
MaxStack.prototype.top = function() {
  return this.stack[this.stack.length-1];
};

/**
* @return {number}
*/
MaxStack.prototype.peekMax = function() {
  return this.maxStack[this.maxStack.length-1];
};

/**
* @return {number}
*/
MaxStack.prototype.popMax = function() {
  let max = this.maxStack.pop();
  let  temp = [];
  while (this.top() !== max) {
      temp.push(this.stack.pop());
      this.maxStack.pop();
  }
  // Remove the max element of the stack
  let maxElem = this.stack.pop();
  while (temp.length) {
      let elem = temp.pop();
      let maxElement = this.maxStack.length === 0 ? null : this.peekMax();
      if (maxElement === null) {
          this.maxStack.push(elem);
      } else {
          this.maxStack.push(Math.max(maxElement, elem));   
      }
      this.stack.push(elem);
  }
  return maxElem;
};

/** 
* Your MaxStack object will be instantiated and called as such:
* var obj = new MaxStack()
* obj.push(x)
* var param_2 = obj.pop()
* var param_3 = obj.top()
* var param_4 = obj.peekMax()
* var param_5 = obj.popMax()
*/