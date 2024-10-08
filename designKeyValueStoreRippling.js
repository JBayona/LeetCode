// Design and implement an in-memory key value data store.
// This data store should be able to support some basic operations such as Get, Set and Delete for string keys and values.

// I would like to see test cases as well as implementation code.
// You can assume that the input operations are always valid, but the key to operate on may be non-existent.

// We won't worry about concurrent access to the database.
// You can handle errors however you think is best.
// Let's start with the data structure of this key value store.

// Implement methods for Get, Set and Delete.

// For example:
// const DB = new Database();
// DB.set("key1", "val1");
// console.log(DB.get("key1")); // val1
// DB.delete("key1");

class Database {
  constructor() {
    this.hash = {};
    this.hashCopy = {};
    this.isActive = false;
  }
  set(key, val) {
    if (this.isActive) {
      this.hashCopy[key] = val;
    } else {
      this.hash[key] = val;
    }
  }
  get(key) {
    console.log(this.isActive);
    if (!(key in this.hash) && !this.isActive) {
      return "Not found!";
    }
    // Active txn
    if (!(key in this.hashCopy) && this.isActive) {
      return "Not found!";
    }

    if (this.isActive) {
      let val = key in this.hashCopy ? this.hashCopy[key] : this.hash[key];
      let final = val === "remove" ? "Not found!" : val;
      this.hashCopy[key] = val;

      return final;
    } else {
      return this.hash[key];
    }
  }
  delete(key) {
    if (!(key in this.hash) && !this.isActive) {
      return "Not found!";
    }
    // Active txn
    if (!(key in this.hashCopy) && this.isActive) {
      return "Not found!";
    }

    if (this.isActive) {
      if (key in this.hashCopy) {
        // Set a signal to remove
        this.hashCopy[key] = "remove";
      }
    } else {
      delete this.hash[key];
    }
  }
  begin() {
    this.isActive = true;
  }
  commit() {
    // Performs operations
    for (let key in this.hashCopy) {
      // Remove case
      if (this.hashCopy[key] === "remove" && key in this.hash) {
        delete this.hash[key];
      } else if (!(key in this.hash)) {
        // New storage/rows
        this.hash[key] = this.hashCopy[key];
      } else if (key in this.hash) {
        // Updates
        this.hash[key] = this.hashCopy[key];
      }
    }
    // Clean this.clean();
    this.hashCopy = {};
    this.isActive = false;
  }
  rollback() {
    this.hashCopy = {};
    this.isActive = false;
  }
}

// For example:
const db = new Database();
db.set("key1", "val1");
// // Begin
// // db.get(key)
// console.log(db.get("key1")); // val1
// db.delete("key1");
// console.log(db.get("key1")); // val1
// db.set("key1", "val1");
// console.log(db.get("key1")); // val1
// db.set("key1", "val2");
// console.log(db.get("key1")); // val2
// console.log(db.get("key2")); // Not found
// db.delete("key1");
// console.log(db.get("key1")); // Not found
// console.log(db.delete("key2")); // Not found
// console.log(db.hash);
// console.log(db.hashCopy);
db.begin();
db.set("key1", "val3");
console.log(db.get("key1"));
// db.commit();
// db.rollback();
db.delete("key1");
// db.commit();
console.log(db.hash);
console.log(db.hashCopy);
console.log(db.get("key1"));
// db.commit(); // Commit will remove and Not found will be returned below
db.rollback(); // Rollback will revert the changes and val3 will be sent
console.log(db.get("key1"));

// Add support for transactions - Begin, Commit and Rollback.

// A transaction is created with the Begin command and creates a context for the other operations to happen.
// Until the active transaction is committed using the Commit command, those operations do not persist.
// The Rollback command throws away any changes made by those operations in the context of the active transaction.

// `Commit()` and `Rollback()` will only happen when inside a transaction, and they both end the transaction.
// Note: We won't worry about concurrency for this part of the question.

// The following examples demonstrate how this might work:

// Example 1
// ---------

// * Set `key0` to `val0`
// * Get `key0`
//   * Expect `val0`
// * Begin transaction
// * Within transaction: Get `key0`
//   * Expect `val0`
// * Within transaction: Set `key1` to `val1`
// * Within transaction: Get `key1`
//   * Expect `val1`
// * Commit transaction
// * Outside the transaction: Get `key1`
//   * Expect `val1`

// Example 2
// ---------

// * Begin transaction
// * Set `key2` to `val2`
// * Get `key2`
//   * Expect `val2`
// * Rollback
// * Get `key2`
//   * Expect an error case as `key2` is not set
