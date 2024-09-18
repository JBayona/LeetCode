/*
Write an algorithm in javascript with the following requirements:
- The command can be "( LET VARNAME VAL )"
- VAL can be an integer, another command or a variable.
- If VAL is a variable, it copies the value, not the variable itself. So further changes to the variable VAL will not be reflected in this assignment.
- We can do multiple statements making our own phrase. The result of the expression will be the result of the last statement.
- For example the expression "( LET X ( ADD 5 2 ) ) ( ( MULT X 3 ) )" should be equal to 21
*/

// Time O(2^N)
function evaluateExpression(expression) {
    let map = {};

    // Get all tokens with separaring with blank spaces
    const tokens = expression.split(" ");
    const expressions = parseExpression(tokens);

    let result = 0;
    for (const exp of expressions) {
        result = computeCommand(exp, map);  // Evaluate each expression in sequence
    }
    return result;
}

// Helper function to parse the input expression string into arrays and values
function parseExpression(tokens) {
    const expressions = [];
    while (tokens.length > 0) {
        expressions.push(parseTokens(tokens));
    }
    return expressions;
}

// Parser to build a SYNTAX TREE from the token list
/*
Result
[
  [ 'LET', 'X', [ 'ADD', 5, 2 ] ],
  [ 'LET', 'Y', [ 'MULT', 8, 3 ] ],
  [ 'MULT', 'X', 'Y' ]
]
*/
function parseTokens(tokens) {
    // We should have tokens to evaluate
    if (tokens.length === 0) {
        return [];
    }
    // Get the first token from the index 0
    const token = tokens.shift();

    // Create an array of evaulation
    if (token === '(') {
        const list = [];
        // Analyze the other expressions inside the parenthesis
        while (tokens[0] !== ')') {
            list.push(parseTokens(tokens));
        }
        tokens.shift(); // Remove closing ')' as we find an expression
        return list;
    } else if (token === ')') {
        // This should not happen
        return [];
    } else {
        if (!isNaN(token)) {
            return Number(token); // Return number literals
        }
        // Return variable names or operators, i.e MULT, X, Y
        return token;
    }
}

function computeCommand(exp, map) {
    // If it's a number
    if (!isNaN(exp)) {
        return Number(exp);
    }

    if (typeof exp === 'string' && (exp in map)) {
        return map[exp];
    }

    // If it's a command, we need to parse it
    if (Array.isArray(exp)) {
        let command = exp[0];
        if (command === 'LET') {
            const name = exp[1];
            const val = computeCommand(exp[2], map);
            map[name] = val;
            return val;
        } else if (command === 'ADD') {
            return computeCommand(exp[1], map) + computeCommand(exp[2], map);
        } else if (command === 'MULT') {
            return computeCommand(exp[1], map) * computeCommand(exp[2], map);
        }
    }
    // Error, it should not reach here
}



// Example usage
// const expression = "( LET X ( ADD 5 2 ) ) ( MULT X 3 )";
const expression = "( LET X ( ADD 5 2 ) ) ( LET Y ( MULT 8 3 ) ) ( MULT X Y )";
console.log(evaluateExpression(expression)); // Output: 21
