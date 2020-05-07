/*
Given a non-empty list of words, return the k most frequent elements.

Your answer should be sorted by frequency from highest to lowest. If two words have the same frequency, then the word with the lower alphabetical order comes first.

Example 1:
Input: ["i", "love", "leetcode", "i", "love", "coding"], k = 2
Output: ["i", "love"]
Explanation: "i" and "love" are the two most frequent words.
    Note that "i" comes before "love" due to a lower alphabetical order.
Example 2:
Input: ["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], k = 4
Output: ["the", "is", "sunny", "day"]
Explanation: "the", "is", "sunny" and "day" are the four most frequent words,
    with the number of occurrence being 4, 3, 2 and 1 respectively.

https://www.geeksforgeeks.org/shortest-path-in-a-binary-maze/
*/

class Solution {
    public List<String> topKFrequent(String[] words, int k) {
        Map<String, Integer> freq = new HashMap<String, Integer>();
        for(String word: words) {
            freq.put(word, freq.getOrDefault(word, 0) + 1);
        }
        
        PriorityQueue<Map.Entry<String, Integer>> maxHeap =
            new PriorityQueue<>((e1, e2) -> e2.getValue() == e1.getValue() ? 
                                e1.getKey().compareTo(e2.getKey()) : e2.getValue()-e1.getValue());
        
        maxHeap.addAll(freq.entrySet());
        
        List<String> results = new ArrayList<String>();
        for(int i = 0; i < k; i++){
            results.add(maxHeap.poll().getKey());
        }
        return results;
    }
}

var topKFrequent = function(words, k) {
    let hash = {};
    for(let i = 0;i < words.length; i++) {
        let elem = words[i];
        if(elem in hash) {
            hash[elem]++;
        } else {
            hash[elem] = 1;
        }
    }
    
    let tmp = [];
    for(let prop in hash) {
        tmp.push([hash[prop], prop]);
    }
    
    // Custom nice sort
    tmp.sort((a,b) => a[0] === b[0] ? a[1].localeCompare(b[1]) : b[0] - a[0]);
    
    let result = [];
    for(let i = 0; i < k; i++) {
        let elem = tmp[i];
        result.push(elem[1]);
    }
    return result;
};