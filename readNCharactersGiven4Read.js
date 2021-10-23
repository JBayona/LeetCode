/*
The API: int read4(char *buf) reads 4 characters at a time from a file.
The return value is the actual number of characters read. For example, it returns 3 if there is
only 3 characters left in the file.
By using the read4 API, implement the function int read(char *buf, int n) that
reads n characters from the file.
Note: The read function will only be called once for each test case.

https://leetcode.com/problems/read-n-characters-given-read4/
*/

/**
* @param buf Destination buffer
* @param n   Maximum number of characters to read
* @return    The number of characters read
*/
const read = (buffer, n) => {
    let total = 0;
    let isEOF = false;
    let tmp = [];
    while(!isEOF && total < n) {
        let count = read4(tmp);
        // Check if it´s the end of file
        isEOF = count < 4;
        // get the actual count
        count = Math.min(count, n - total);
        // copy from temp buffer to buffer
        for (int i = 0; i < count; i++) 
        buffer[total++] = tmp[i];
    }
}

// Follow-up: The read function may be called multiple times.
let queue = [];
const read = (buffer, n) => {
    let index = 0
    // If the queue is not empty first read from the queue
    while(queue.length && i < n) {
        buffer[index++] = queue.shift();
    }
    
    if(index == n) return n;

    tmp = new Array(4);
    while(index < n) {
        let count = read4(buffer);
        let i = 0;
        for(; i < count && index < n; i++) {
            buffer[index++] = tmp[i];
        }
        while(i < count) {
            queue.push(tmp[i++]);
        }
        // Nothing left to read from the file
        if(count < 4) {
            break;
        }
    }
    return index;
}
