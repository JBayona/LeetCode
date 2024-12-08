// Given a coefficient, evaluate the expression of the form f(x) = ax^2 + bx + c
// Note, there might be some missing terms, for example:
// square(x) = ax^2
// lineal(x) = x + c
// constant(c) = c
function applyFunction(quadraticFunction, x) {
  if (!quadraticFunction) {
    return -1;
  }
  // Get only the coefficient and not the left right definition
  let arr = quadraticFunction.split("=");
  str = arr[1];

  let a = 0;
  let b = 0;
  let c = 0;
  // Parse string, divide by terms and signs
  // Get the terms with signs and terms
  let numbers = str.split(/(?=[+-])/);
  console.log(numbers);
  for (let n of numbers) {
    // Exponencial for x^2
    // It can either be only x² or nx²
    if (n.includes("x²")) {
      a = n.replace("x²", "").trim() || "1";
      if (a === "-") {
        a = "-1";
      }
      a = Number(a);
    } else if (n.includes("x")) {
      b = n.replace("x", "").trim() || "1";
      if (b === "-") {
        b = "-1";
      }
      if (b === "+") {
        b = "1";
      }
      b = Number(b);
    } else {
      // Constants
      c = Number(n);
    }
  }
  // Evaluate the expression
  return a * x ** 2 + b * x + c;
}

console.log(applyFunction("f(x) = x²", 2));
console.log(applyFunction("f(x) = 2x²+5x", 3));
console.log(applyFunction("f(x) = 4x²+2x-5", 2));
console.log(applyFunction("f(x) = 5", 2));
console.log(applyFunction("f(x) = -x²", 2));
