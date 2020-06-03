/*
You are given an information on Cat object such as name,height and weight. For eg following:

String[] names = {"a","b","c","d","e","f","g","h"};
Integer[] height = {31,24,67,12,45,21,31,12};
Integer[] weight = {120,124,160,130,175,120,124,142};

You have to write a method which takes the following input and return the list of Cat
objects which satisfies the input criteria. For eg

searchCriteria could be : HEIGHT or WEIGHT
searchValue could be : Integer value of either HEIGHT or WEIGHT
symbol could be : "<" , ">", or "="

public List<Cat> getCatNames(List<Cat> cats, String searchCriteria, Integer searchValue, String symbol) {
}
If I call above getCatNames function as (cats, "HEIGHT",43,"<"), i should get following List:

[Cat{name='g', height=31, weight=124},
Cat{name='a', height=31, weight=120},
Cat{name='b', height=24, weight=124},
Cat{name='f', height=21, weight=120},
Cat{name='h', height=12, weight=142},
Cat{name='d', height=12, weight=130}]

Another example:

If I call above getCatNames function as (cats, "WEIGHT",120,"="), i should get following List:

[Cat{name='a', height=31, weight=120},
Cat{name='f', height=21, weight=120}]

You have to write a working code for it.
*/

function Cat(name, height, weight) {
  this.name = name;
  this.height = height;
  this.weight = weight;
}

function getCatNames(cats, searchCriteria, searchValue, symbol) {
  if(searchCriteria === 'WEIGHT') {
    return filterByWeight(cats, searchValue, symbol);
  } else {
    return filterByHeight(cats, searchValue, symbol);
  }
}

function filterByHeight(cats, searchValue, symbol) {
  switch(symbol) {
    case '>': return cats.filter((element) => element.height > searchValue); break;
    case '<': return cats.filter((element) => element.height < searchValue); break;
    case '=': return cats.filter((element) => element.height == searchValue); break;
  }
}

function filterByWeight(cats, searchValue, symbol) {
  switch(symbol) {
    case '>': return cats.filter((element) => element.weight > searchValue); break;
    case '<': return cats.filter((element) => element.weight < searchValue); break;
    case '=': return cats.filter((element) => element.weight == searchValue); break;
  }
}

function main(names, height, weight) {
  let cats = [];
  // Create an array of Cats objects
  for(let i = 0 ; i < names.length; i++) {
    cats.push(new Cat(names[i], height[i], weight[i]));
  }
  // All cats
  console.log(cats);
  // Get cats
  console.log('Cats height < 43');
  let cats1 = getCatNames(cats, "HEIGHT", 43, "<");
  console.log(cats1);
  console.log('Cats weight = 120');
  let cats2 = getCatNames(cats, "WEIGHT", 120, "=");
  console.log(cats2);
}

let names = ["a","b","c","d","e","f","g","h"];
let height = [31,24,67,12,45,21,31,12];
let weight = [120,124,160,130,175,120,124,142];
console.log(main(names, height, weight));