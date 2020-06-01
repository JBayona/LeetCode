/*
Given a list accounts, each element accounts[i] is a list of strings, where the first element accounts[i][0] is a
name, and the rest of the elements are emails representing emails of the account.

Now, we would like to merge these accounts. Two accounts definitely belong to the same person if there
is some email that is common to both accounts. Note that even if two accounts have the same name, they may
belong to different people as people could have the same name. A person can have any number of accounts
initially, but all of their accounts definitely have the same name.

After merging the accounts, return the accounts in the following format: the first element of each
account is the name, and the rest of the elements are emails in sorted order. The accounts themselves
can be returned in any order.

Example 1:
Input: 
accounts = [["John", "johnsmith@mail.com", "john00@mail.com"],
["John", "johnnybravo@mail.com"], ["John", "johnsmith@mail.com", "john_newyork@mail.com"], 
"Mary", "mary@mail.com"]]
Output: [["John", 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com'],
["John", "johnnybravo@mail.com"], ["Mary", "mary@mail.com"]]
Explanation: 
The first and third John's are the same person as they have the common email "johnsmith@mail.com".
The second John and Mary are different people as none of their email addresses are used by other accounts.
We could return these lists in any order, for example the answer [['Mary', 'mary@mail.com'], ['John', 'johnnybravo@mail.com'], 
['John', 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com']] would still be accepted.

https://leetcode.com/problems/accounts-merge/
*/

// Time O(n^2*m)
// Space O(k)
// Where n is the number of rows, m is the maximum number of columns and k the total size
// of the text
var accountsMerge = function(accounts) {
  if(!accounts.length) {
      return [];
  }
  let parent = {}
  for(let i = 0; i < accounts.length; i++) {
      parent[i] = i;
  }
  // {0:0, 1:1, 2:2, 3:3..}
  
  // Union find
  let emailToIdx = {}; // {john_newyork@mail.com: 0, johnsmith@mail.com: 0....}
  for(let i = 0; i < accounts.length; i++) {
    let account = accounts[i];
    let name = account[0];
    let emails = account.slice(1);
    for(let email of emails) {
      if(email in emailToIdx) {
        let givenIndex = emailToIdx[email];
        let parent1 = findParent(givenIndex, parent);
        let parent2 = findParent(i, parent);
        parent[parent2] = parent1;
      } else {
        // As we are iterating over of all our emails, the i position help us
        // to mark a distinction of the owner of the email, so of all the emails
        // will have the same index as parent, every time we find an email already
        // registered, we update the parent to be the parent one to make union find
        emailToIdx[email] = i;
      }
    }
  }
  // console.log(parent); // {0:0, 1:0, 2:2, 3:3..}
  // {node: parent, node: parent....}
  
  // Merge accounts
  let indexToEmail = {};
  for(let i = 0; i < accounts.length; i++) {
    let account = accounts[i];
    //console.log(account.length);
    for(let j = 1; j < account.length; j++) {
      let p = findParent(i, parent);
      if(p in indexToEmail) {
          indexToEmail[p].add(account[j]);
      } else {
          indexToEmail[p] = new Set([account[j]]);
      }
    }
  }
  
  // console.log(indexToEmail);
  /* {
      '0': Set(3) { 'johnsmith@mail.com', 'john_newyork@mail.com', 'john00@mail.com'},
      '2': Set(1) { 'mary@mail.com' },
      '3': Set(1) { 'johnnybravo@mail.com' 
  } */
  
  // Format the output
  let result = [];
  for(let index in indexToEmail) {
    let account = accounts[index];
    let name = account[0];
    let tmp = [name];
    // Output is required to sort the elements
    tmp.push(...Array.from(indexToEmail[index]).sort());
    result.push(tmp);
  }
  return result;

};

function findParent(node, parent) {
  if(parent[node] === node) {
    return node;
  }
  return findParent(parent[node], parent);
}