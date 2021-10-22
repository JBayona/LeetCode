/*
The API: int read4(char *buf) reads 4 characters at a time from a file.
The return value is the actual number of characters read. For example, it returns 3 if there is
only 3 characters left in the file.
By using the read4 API, implement the function int read(char *buf, int n) that reads n characters from the file.
Note: The read function will only be called once for each test case.

https://leetcode.com/problems/read-n-characters-given-read4/
*/

// @buffer [] array
// @n int
const read = (buffer, n) => {
    let total = 0;
    let isEOF = false;
    let tmp = [];

    while(!isEOF && total < n) {
        let count = read4(buffer);
        // Check if it´s the end of the file
        isEOF = count < 4;
        // Get the actual count
        total = Math.min(count, n - total);
        // Copy from temp buffer to buf
        for(let i = 0; i < total; i++) {
            buffer[total++] = tm[i];
        }
    }
    return total;
}