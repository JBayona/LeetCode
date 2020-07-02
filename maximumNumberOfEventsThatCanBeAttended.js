/*
Given an array of events where events[i] = [startDayi, endDayi].
Every event i starts at startDayi and ends at endDayi.

You can attend an event i at any day d where startTimei <= d <= endTimei.
Notice that you can only attend one event at any time d.

Return the maximum number of events you can attend.

https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended/
*/

// Greedy algorithm
// Sort events by endDay;
// We greedily attend the event that ends sooner.
// For each event, if we can attend a event, we increment the result count.
// Time Complexity: O(NK) = O(N^2) = O(10^5 * 10^5)
var maxEvents = function(events) {
    // Sort based on end time, from greater to less value
    events.sort((a, b) => a[1] === b[1] ? a[0] - b[0] : a[1] - b[1]);
    let attended = new Array(100001).fill(false); // 10^5
    
    let answer = 0;
    for(let event of events) {
        let [start, end] = event;
        for(let i = start; i <= end; i++) {
            if(attended[i] === false) {
                attended[i] = true;
                answer++;
                break;
            }
        }
    }
    return answer;
};