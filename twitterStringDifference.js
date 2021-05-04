function difference(before, after) {
  if(before.length === after.length) {
    return getReplace(before, after);
  } else if(before.length > after.length) {
    return insertOrDelete(before, after, "delete");
  } else {
    return insertOrDelete(before, after, "insert");
  }
}

function getReplace(before, after) {
  let index = 0;
  let result = '';
  let flag = false;
  for(let i = 0; i < before.length; i++) {
    if(before[i] !== after[i]) {
      if(!flag) {
        index = i;
        flag = true;
      }
      result += after[i];
    }
  }
  return {type: 'replace', index: index, change: result};
}

function insertOrDelete(before, after, type) {
  let i = 0;
  for(i = 0; i < before.length; i++) {
    if(before[i] !== after[i]) {
      break;
    }
  }
  let end = i + Math.abs(after.length - before.length);

  if(type === "insert") {
    return {type, index: i, change: after.substring(i, end)};
  } else { // delete
    return {type, index: i, change: before.substring(i, end)};
  }
}

// before = "test string"; // Replace change weer
// after = "test stwerg";
before = "test string"; // Insert ubs
after = "test substring";
// before = "test string"; // Delete ubs
// after = "test sing";
console.log(difference(before, after));