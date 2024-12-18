/*
Write the solution for the problem below:
Part 1:Create an in-memory database that accepts the following commands:
1. void set(String name, String value): Set the record <name> to <value>, overwriting the existing record if any.
2. String get(String name): Return the value of the record <name>, or null if that record doesn't exist.
3. void unset(String name): Delete the record <name>, making it just like that record was never set.
4: int numWithValue(String value): Return the number of records that are currently set to. If no records equal that value, return 0.
*/

/*
Part 2: Implement the save point and rollback behavior by implementing the following commands:
1. void begin(): Start a new transaction.
2. void rollback(): Restore the database to the state it was in at the start of the transaction (ie, when begin() was called) and end the transaction.
3. void commit(): Store the current state as permanent changes.

Whenever the transaction is started with the "begin" command, if we run the previous "set", "unset"
"get" and "numWithValue" the values should be coming from the current state, if that state is rollback
the errors are not persisted, otherwise, once commited, those are the new values.

Part 2 can be accomplished by maintaining a stack of snapshots that represent the database state
at different levels. Each transaction can either be commited, rolled back or left open for further
operations

NOTE - FOR THE TRANSACTION SUPPORT, WE ALWAYS MODIFY THE VALUE TO THE CURRENT DATA STRUCTURE / HASH MAP
AS THE OPERATIONS WILL BE PERFORMED DIRECTLY TO THE HASH, BUT WE MAINTAIN A COPY OF THE CURRENT STATE
SO WE HAVE THE OPTION TO ROLLBACK WHEN NEEDED.
*/

// Part 1:
class Database {
  constructor() {
    this.data = {}; // Store the key-value pairs
    this.valueCount = {}; // Store the count of each value
    // Part 2
    this.transactionStack = []; // Stack to store snapshots for transactions
  }
  //Part 1
  // Set the record <name> to <value>
  set(name, value) {
    // If we need to override, the count should be updated, decremented by 1
    if (name in this.data) {
      const oldValue = this.data[name];
      this._decrementValueCount(oldValue);
    }
    this.data[name] = value;
    this._incrementValueCount(value);
  }

  // Return the value of the record <name>, or null if it doesn't exist
  get(name) {
    return name in this.data ? this.data[name] : null;
  }

  // Delete the record <name>
  unset(name) {
    if (name in this.data) {
      const oldValue = this.data[name];
      this._decrementValueCount(oldValue);
      delete this.data[name];
    }
  }

  // Return the number of records that have the given <value>
  numWithValue(value) {
    return this.valueCount[value] || 0;
  }

  // Helper method to increment the count of a value
  _incrementValueCount(value) {
    if (!(value in this.valueCount)) {
      this.valueCount[value] = 0;
    }
    this.valueCount[value]++;
  }

  // Helper method to decrement the count of a value
  _decrementValueCount(value) {
    if (value in this.valueCount) {
      this.valueCount[value]--;
      if (this.valueCount[value] === 0) {
        delete this.valueCount[value];
      }
    }
  }
  // Part 2
  // Start a new transaction
  begin() {
    const snapshot = {
      data: { ...this.data }, // Create a shallow copy of the current state
      valueCount: { ...this.valueCount },
    };
    this.transactionStack.push(snapshot);
  }
  // Rollback the database to the state at the start of the transaction
  rollback() {
    if (this.transactionStack.length === 0) {
      throw new Error("No transaction to rollback");
    }
    const snapshot = this.transactionStack.pop();
    this.data = snapshot.data;
    this.valueCount = snapshot.valueCount;
  }
  // Commit the current transaction
  commit() {
    if (this.transactionStack.length === 0) {
      throw new Error("No transaction to commit");
    }
    this.transactionStack.pop(); // Discard the snapshot since changes are now permanent
  }
}

// Example usage - Part 1
const db = new Database();

db.set("name", "Alice");
db.set("age", "30");
console.log(db.get("name")); // Alice
console.log(db.numWithValue("Alice")); // 1

// Override the name property
db.set("name", "Bob");
console.log(db.numWithValue("Alice")); // 0
console.log(db.numWithValue("Bob")); // 1

db.unset("age");
console.log(db.get("age")); // null
console.log(db.numWithValue("30")); // 0

// Example usage - Part 2
const db = new InMemoryDatabaseWithTransactions();

db.set("name", "Alice");
db.set("age", "30");
console.log(db.get("name")); // Alice

db.begin(); // Start a transaction
db.set("name", "Bob");
console.log(db.get("name")); // Bob
console.log(db.numWithValue("Alice")); // 0

db.rollback(); // Rollback to before the transaction
console.log(db.get("name")); // Alice
console.log(db.numWithValue("Alice")); // 1

db.begin(); // Start another transaction
db.set("name", "Charlie");
db.commit(); // Commit the transaction
console.log(db.get("name")); // Charlie

db.rollback(); // Error: No transaction to rollback