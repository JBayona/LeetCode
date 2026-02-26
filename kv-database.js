var readline = require('readline');
// Class.
class Database{
	constructor() {
		this.datastore = {};
		this.transactions = [];
		this.isOpenTxn = false;
		this.prevTransaction = [];
	}

	// Methods
	setValue(input) {
		let key = input[1];
		let value = input[2];

		this.datastore[key] = value;
		// console.log(this.datastore);
	}

	getValue(input) {
		let key = input[1];

		if(key in this.datastore) {
			return this.datastore[key];
		}
		return null;
	}

	unsetValue(input) {
		let key = input[1];

		if(key in this.datastore) {
			delete this.datastore[key];
			// console.log(this.datastore);
		}
	}

	numWithValue(input) {
		let value = input[1];
		let count = 0;
		//let values = Object.values(this.datastore).filter(val => val === value);
		for(let key in this.datastore) {
			if(this.datastore[key] === value) {
				count++;
			}
		}
		return count;
	}

	begin() {
		// Flag to set a new transaction
		this.isOpenTxn = true;
		this.transactions = [];
		// Save the current state of the txn
		this.prevTransaction.push(this.datastore);

		// To avoid reference
		let newStore = Object.assign({}, this.datastore);
		this.datastore = newStore;
		/*for(let key in this.datastore) {
			newStore[key] = this.datastore[key];
		}
		this.datastore = newStore;*/

	}

	rollback() {
		// If we have a txn
		if(this.isOpenTxn && this.prevTransaction.length){
			// Restore the state of our last txn
			let last = this.prevTransaction.pop();
			// Update the current state with the last transaction
			this.datastore = last;
		} else {
			return "NO TRANSACTION";
		}
	}

	commit() {
		// If we have an open txn
		if(this.isOpenTxn) {
			this.isOpenTxn = false;
			// Save the past draft txn
			this.prevTransaction.push(this.datastore);
			// Iterate over our txnS and update our memory
			let newMap = {};
			this.prevTransaction.forEach(txn => {
				let map = txn;
				for(let key in map) {
					newMap[key] = map[key];
				}
			});
			// Assign all updated values to our txn
			this.datastore = newMap;
		} else {
			return "NO TRANSACTION";
		}
	}

	getDatabase() {
		return this.datastore;
	}

}

database = new Database();

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function (line) {
	let input = line.split(' ');
	let command = input[0];
	switch(command) {
		case "SET":
			result = database.setValue(input);
			break;
		case "GET":
			result = database.getValue(input);
			break;
		case "UNSET":
			result = database.unsetValue(input);
			break;
		case "NUMWITHVALUE":
			result = database.numWithValue(input);
			break;
		case "BEGIN":
			result = database.begin();
			break;
		case "ROLLBACK":
			result = database.rollback();
			break;
		case "COMMIT":
			result = database.commit();
			break;
		case "PRINT":
			result = database.getDatabase();
			break;
		case "END":
			process.exit();
		default:
			console.log("UNKNOWN COMMAND")
	}
	if(result) {
		console.log(result);
	}
});

/*
In-Memory Key-Value Database
Overview
You are to build a data structure for storing integers. You will not persist the database to disk, you will store the data in memory.

For simplicity's sake, instead of dealing with multiple clients and communicating over the network, your program will receive commands via stdin, and should write appropriate responses to stdout. Each line of the input will be a command (specified below) followed by a specific number of arguments depending on the command.

For example:

COMMAND a b
COMMAND2 c
END
Your database should accept the following commands.

SET name value

Set the variable name to the value value. Neither variable names nor values will contain spaces.

GET name

Print out the value of the variable name, or NULL if that variable is not set.

UNSET name

Unset the variable name, making it just like that variable was never set.

NUMWITHVALUE value

Print out the number of variables that are currently set to value. If no variables equal that value, print 0.

END

Exit the program. Your program will always receive this as its last command.

Once your database accepts the above commands and is tested and works, implement commands below.

BEGIN

Open a new transaction block. Transaction blocks can be nested (BEGIN can be issued inside of an existing block) but you should get non-nested transactions working first before starting on nested. A GET within a transaction returns the latest value by any command. Any data command that is run outside of a transaction block should commit immediately.

ROLLBACK

Undo all of the commands issued in the most recent transaction block, and close the block. Print nothing if successful, or print NO TRANSACTION if no transaction is in progress.

COMMIT

Close all open transaction blocks, permanently applying the changes made in them. Print nothing if successful, or print NO TRANSACTION if no transaction is in progress.

Your output should contain the output of the GET and NUMWITHVALUE commands. GET will print out the value of the specified key, or NULL. NUMWITHVALUE will return the number of keys which have the specified value.

Sample Input
SET ex 10
GET ex
UNSET ex
GET ex
END
Sample Output
10
NULL

https://github.com/lyft/interview-questions/tree/master/laptop-questions/kv-database
*/
