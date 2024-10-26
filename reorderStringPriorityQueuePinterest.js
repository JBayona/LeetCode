/*
Given a string S, check if the letters can be rearranged so that two characters that are adjacent to each other are not the same.

If possible, output any possible result.  If not possible, return the empty string.

Example 1:

Input: S = "aab"
Output: "aba"
Example 2:

Input: S = "aaab"
Output: ""
Note:

S will consist of lowercase letters and have length in range [1, 500].

https://leetcode.com/problems/reorganize-string/
*/

/*
Approach:
1. Count the frequency of each character in the input string.
2. Check if the frequency of any character exceeds half the length of the string. If it does, it's not possible to reorganize the string, so return an empty string.
3. Build a priority queue (max heap) of character frequencies and characters themselves.
3. While the priority queue has at least two elements:
  3.1 Pop the two characters with the highest frequencies from the priority queue.
  3.2 Append these characters to the result string.
  3.3 Decrease their frequencies by 1 and push them back to the priority queue if their frequency is still greater than 1.
4. If there's one character left in the priority queue, append it to the result string.
5. Return the result string as the reorganized string.
*/
// Option 1 - Heap
// Time O(N Log N)
// Space O(N)
var reorganizeString = function(s) {
    let hash = {};
    for (let i = 0; i < s.length; i++) {
        let c = s[i];
        if (!(c in hash)) {
            hash[c] = 0;
        }
        hash[c]++;
    }
    
    let maxHeap = new PriorityQueue({
        compare: (a, b) => b.val - a.val
    });

    // Add everything to the queue
    for (let prop in hash) {
        maxHeap.enqueue({c: prop, val: hash[prop]});
    }

    let maxFreq = maxHeap.front();
    // If the max frequency have more that the half of the string, we would have at least one adjacent char
    if (maxFreq.val > (s.length + 1) / 2) {
        return '';
    }

    // While we have more than two chars, get two max values and concatenate
    // decrement the value and add it back to the queue if we still have more
    // counts on the char
    let result = '';
    while (maxHeap.size() >= 2) {
        let first = maxHeap.dequeue();
        let second = maxHeap.dequeue();
        // Only add the characters
        result += (first.c + second.c);
        if (first.val > 1) {
            maxHeap.enqueue({c: first.c, val: first.val - 1});
        }
        if (second.val > 1) {
            maxHeap.enqueue({c: second.c, val: second.val - 1});
        }
    }
    // At this point we could still have one character at most if we didn't
    // exhaust everything on the while abovr
    if (!maxHeap.isEmpty()) {
        result += maxHeap.dequeue().c;
    }
    return result;
};



// Option 2 - Sort
var reorganizeString = function(S) {
    // Get the frequency map
    let map = {};
    for(let i = 0; i < S.length; i++) {
        let c = S[i];
        if (!(c in map)) {
            map[c] = 0;
        }
        map[c]++;
    }
    
    // Sort based on the frequency (only letters)
    let sortedArray = Object.keys(map).sort((a, b) => map[b] - map[a]);
    
    // If the max frequency have more that the half of the string, we would have at least one adjacent char
    let maxElement = (S.length + 1) / 2;
    if(map[sortedArray[0]] > maxElement) {
        return '';
    }
    
    // Interleave characters
    let result = [];
    let position = 0;
    for(let i = 0; i < sortedArray.length; i++) {
        let char = sortedArray[i];
        let frequency = map[char];
        for(let j = 0; j < frequency; j++) {
            // Rewind pointer to 1 when we overflow odd indexes...
            // We don't have enough characters to overflow again
            if (position >= S.length) {
                position = 1;
            }
            result[position] = char;
            // First pass 2, 4, 6, 8, 10, 12
            // Second pass 1, 3, 5, 7, 9, 11
            position += 2;
        }
    }
    
    return result.join('');
};