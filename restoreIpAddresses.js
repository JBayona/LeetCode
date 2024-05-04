/*
Given a string containing only digits, restore it by returning all possible valid IP
address combinations.

For example:
Given "25525511135",
return ["255.255.11.135", "255.255.111.35"]. (Order does not matter)

https://leetcode.com/problems/restore-ip-addresses/description/
/
var restoreIpAddresses = function (s) {
  var result = [];
  if (s.length > 12) {
    return [];
  }
  helper(result, [], 0, s.length, s);
  return result;
};

function helper(result, currArr, index, len, s) {
  // Insert the result into the array
  if (currArr.length === 4) {
    if (index === len) {
      result.push(currArr.join("."));
    }
    return;
  }
  // Solo tres situaciones, porque es de longitud de 3 cada espacio de la IP
  for (let i = index; i < len && i <= index + 3; i++) {
    // Sacamos caracter por caracter y validamos
    // Num has the validations and we are concatenating but
    // we are inserting digit by digit in the currArr.
    let num = s.substring(index, i + 1);
    if (isValid(num)) {
      currArr.push(parseInt(num));
      helper(result, currArr.concat(), i + 1, len, s);
      currArr.pop();
    }
  }
}

function isValid(s) {
  if (s.charAt(0) === "0") {
    return s === "0";
  }
  let num = parseInt(s);
  return num >= 0 && num <= 255;
}
