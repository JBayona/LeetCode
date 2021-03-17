/*
Implement the class TweetCounts that supports two methods:

1. recordTweet(string tweetName, int time)

Stores the tweetName at the recorded time (in seconds).
2. getTweetCountsPerFrequency(string freq, string tweetName, int startTime, int endTime)

Returns the total number of occurrences for the given tweetName per minute, hour, or day (depending on freq) starting from the startTime (in seconds) and ending at the endTime (in seconds).
freq is always minute, hour or day, representing the time interval to get the total number of occurrences for the given tweetName.
The first time interval always starts from the startTime, so the time intervals are [startTime, startTime + delta*1>,  [startTime + delta*1, startTime + delta*2>, [startTime + delta*2, startTime + delta*3>, ... , [startTime + delta*i, min(startTime + delta*(i+1), endTime + 1)> for some non-negative number i and delta (which depends on freq).  
 

Example:

Input
["TweetCounts","recordTweet","recordTweet","recordTweet","getTweetCountsPerFrequency","getTweetCountsPerFrequency","recordTweet","getTweetCountsPerFrequency"]
[[],["tweet3",0],["tweet3",60],["tweet3",10],["minute","tweet3",0,59],["minute","tweet3",0,60],["tweet3",120],["hour","tweet3",0,210]]

Output
[null,null,null,null,[2],[2,1],null,[4]]

Explanation
TweetCounts tweetCounts = new TweetCounts();
tweetCounts.recordTweet("tweet3", 0);
tweetCounts.recordTweet("tweet3", 60);
tweetCounts.recordTweet("tweet3", 10);                             // All tweets correspond to "tweet3" with recorded times at 0, 10 and 60.
tweetCounts.getTweetCountsPerFrequency("minute", "tweet3", 0, 59); // return [2]. The frequency is per minute (60 seconds), so there is one interval of time: 1) [0, 60> - > 2 tweets.
tweetCounts.getTweetCountsPerFrequency("minute", "tweet3", 0, 60); // return [2, 1]. The frequency is per minute (60 seconds), so there are two intervals of time: 1) [0, 60> - > 2 tweets, and 2) [60,61> - > 1 tweet.
tweetCounts.recordTweet("tweet3", 120);                            // All tweets correspond to "tweet3" with recorded times at 0, 10, 60 and 120.
tweetCounts.getTweetCountsPerFrequency("hour", "tweet3", 0, 210);  // return [4]. The frequency is per hour (3600 seconds), so there is one interval of time: 1) [0, 211> - > 4 tweets.

https://leetcode.com/problems/tweet-counts-per-frequency/
*/

var TweetCounts = function() {
    this.map = {};
};

/** 
 * @param {string} tweetName 
 * @param {number} time
 * @return {void}
 */

/*
{
tweet3: 0, 60, 10
}


*/
TweetCounts.prototype.recordTweet = function(tweetName, time) {
    if(!(tweetName in this.map)) {
        this.map[tweetName] = [];
    }
    this.map[tweetName].push(time);
};

/** 
 * @param {string} freq 
 * @param {string} tweetName 
 * @param {number} startTime 
 * @param {number} endTime
 * @return {number[]}
 */
TweetCounts.prototype.getTweetCountsPerFrequency = function(freq, tweetName, startTime, endTime) {
    let array = this.map[tweetName];
    let freqTime = 0;
    let result = [];
    
    switch(freq) {
        case 'minute': freqTime = 60; break;
        case 'hour': freqTime = 3600; break;
        case 'day': freqTime = 3600 * 24; break;
    }    
    array.sort((a, b) => a - b);
    
    let index = 0;
    let nowInterval = startTime;
    while(nowInterval <= endTime) {
        // Skip those that does not belong into the interval based on the start time
        while(index < array.length && array[index] < startTime) {
            index++;
        }
        let count = 0;
        // Find the elements in the array that are part of the range based on the frequency
        // count them and move the array until we find an element that does not belong
        // nowInterval + freqTime denotes the different ranges in the result array
        while(index < array.length &&  array[index] < nowInterval + freqTime && array[index] <= endTime) {
            index++;
            count++;
        }
        result.push(count);
        nowInterval += freqTime;
    }
    return result;
};

/** 
 * Your TweetCounts object will be instantiated and called as such:
 * var obj = new TweetCounts()
 * obj.recordTweet(tweetName,time)
 * var param_2 = obj.getTweetCountsPerFrequency(freq,tweetName,startTime,endTime)
 */