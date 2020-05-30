/*
# 
# 
# PRINT AN ORG CHART
# 
# We have an organization and need to print a org chart in the terminal. Input is
# a list of strings. Each string is a management / report relationship.
# 
# EXAMPLE INPUT:
# 
# [
#     'George,Hannah',
#     'King,B,C,D',
#     'B,E,F',
#     'D,G,I',
#     
# ]
# 
# [
#     ['G,H'],
#     'A,B,C,D',
#     'B,E,F',
#     'D,G,I',
#     
# ]
# 
# A is the manager of B, C, D. B is the manager of E and F, and so forth.
# 
# EXAMPLE OUTPUT:
# 
# A
# ....B
# ........E
# ........F
# ....C
# ....D
# ........G
# ............H
# ........I
#
#
*/

function build(input) {
  let hash = {};
  let nonTop = new Set();

  for(let i = 0; i < input.length; i++) {
    let people = input[i].split(',');
    for(let j = 1; j < people.length; j++) {
      if(!(people[0] in hash)) {
        hash[people[0]] = [];
      }
      // If the element is not part of the children
      if(hash[people[0]].indexOf(people[j]) < 0){
        hash[people[0]].push(people[j]);
      }
      if(!nonTop.has(people[j])) {
        nonTop.add(people[j]);
      }
    }
  }

  // console.log(hash);
  // console.log(nonTop);

  let top = [];
  // Find the parent, this is the root
  for(let prop in hash) {
    if(!nonTop.has(prop)) {
      top.push(prop);
    }
  }

  let result = [];
  for(let topVal of top) {
    printTop(topVal, hash, result, 0);
  }

  // Print the result
  for(let line of result) {
    console.log(line);
  }
}

function printTop(top, dict, result, level) {
  let prefix = "*".repeat(4 * level);
  result.push(prefix + '' + top);
  // Check if we have the top as parent
  // If we don't have them, break current recursion
  if(!(top in dict)) {
    return;
  }
  let toPrint = Array.from(dict[top]);

  for(let p of toPrint) {
    printTop(p, dict, result, level + 1);
  }
}

let input = [
'G,H',
'A,B,C,D',
'B,E,F',
'D,G,I',
]
build(input);

# Python
from collections import defaultdict
def build(input):
    dict = defaultdict(set)
    non_top = set()
    for v in input:
        people = v.split(',')
        for i in range(1, len(people)):
            if people[i] not in dict[people[0]]:
                dict[people[0]].add(people[i])
            if people[i] not in non_top:
                non_top.add(people[i])

    tops = []
    for key in dict:
        if key not in non_top:
            tops.append(key)
            
    # tops.sort()
    result = []
    
    for top in tops:
        printTop(top, dict, result, 0)
    
    for line in result:
        print(line)
    
    
def printTop(top, dict, result, level):
    prefix = "." * level * 4
    result.append(f'{prefix}{top}')
    to_print = list(dict[top])
    to_print.sort()
    
    for p in to_print:
        printTop(p, dict, result, level + 1)
    
input = [
    'G,H',
    'A,B,C,D',
    'B,E,F',
    'D,G,I',
    'X,Z,A'
]
build(input)

let input = [
'G,H',
'A,B,C,D',
'B,E,F',
'D,G,I',
]
build(input);