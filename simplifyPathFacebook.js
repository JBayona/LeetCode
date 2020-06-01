/*
Given current directory and change directory path, return final path.

For Example:

Curent                 Change            Output

/                    /facebook           /facebook
/facebook/anin       ../abc/def          /facebook/abc/def
/facebook/instagram   ../../../../.      /

*/

// Time O(N + M) N = Current length, M = change length
// Space O(N + M)
// Time O(N + M) N = Current length, M = change length
// Space O(N + M)
function simplifyPath(current, change) {
  if(!current || !change) {
    return current;
  }

  let stack = [];
  let currentComponents = current.split('/');
  for(let directory of currentComponents) {
    // While directory is not null
    if(directory) {
      stack.push(directory);
    }
  }

  let changeComponents = change.split('/');
  for(let directory of changeComponents) {
    // Current directory . or empty directory
    // We don´t need to do anything here
    if(!directory || directory === '.') {
      continue;
    }
    // Previous directory
    if(directory === '..') {
      // If the stack is not empty, go to the previous directory
      if(stack.length) {
        stack.pop();
      }
    } else {
      stack.push(directory);
    }
  }

  console.log('Path');
  console.log(stack);

  let path = [];
  // Format output
  for(let i = 0; i  < stack.length; i++) {
    path.push('/');
    path.push(stack[i]);
  }

  return path.length > 0 ? path.join('') : '/';
}

// current = "/";
// change = "/facebook "; // result => /facebook

current = "/facebook/anin";
change = "../abc/def"; //result => /facebook/abc/def

// current = "/facebook/instagram";
// change = "../../../../."; //result => /
console.log(simplifyPath(current, change));