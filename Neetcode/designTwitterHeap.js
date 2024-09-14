/*
Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and is able
to see the 10 most recent tweets in the user's news feed.

Implement the Twitter class:

Twitter() Initializes your twitter object.
void postTweet(int userId, int tweetId) Composes a new tweet with ID tweetId by the user userId. Each call
to this function will be made with a unique tweetId.
List<Integer> getNewsFeed(int userId) Retrieves the 10 most recent tweet IDs in the user's news feed. Each item in
the news feed must be posted by users who the user followed or by the user themself. Tweets must be ordered from most
recent to least recent.
void follow(int followerId, int followeeId) The user with ID followerId started following the user with ID followeeId.
void unfollow(int followerId, int followeeId) The user with ID followerId started unfollowing the user with ID followeeId.
 

Example 1:
Input
["Twitter", "postTweet", "getNewsFeed", "follow", "postTweet", "getNewsFeed", "unfollow", "getNewsFeed"]
[[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]
Output
[null, null, [5], null, null, [6, 5], null, [5]]

Explanation
Twitter twitter = new Twitter();
twitter.postTweet(1, 5); // User 1 posts a new tweet (id = 5).
twitter.getNewsFeed(1);  // User 1's news feed should return a list with 1 tweet id -> [5]. return [5]
twitter.follow(1, 2);    // User 1 follows user 2.
twitter.postTweet(2, 6); // User 2 posts a new tweet (id = 6).
twitter.getNewsFeed(1);  // User 1's news feed should return a list with 2 tweet ids -> [6, 5]. Tweet id 6 should precede tweet id 5 because it is posted after tweet id 5.
twitter.unfollow(1, 2);  // User 1 unfollows user 2.
twitter.getNewsFeed(1);  // User 1's news feed should return a list with 1 tweet id -> [5], since user 1 is no longer following user 2.
*/

var Twitter = function() {
    // Id used to increment each time and simulate
    // newest times
    this.time = 0;
    this.graph = {};
};

/** 
 * @param {number} userId 
 * @param {number} tweetId
 * @return {void}
 */
Twitter.prototype.postTweet = function(userId, tweetId) {
    if (!(userId in this.graph)) {
        this.graph[userId] = {posts: [], following: []};
    }
    // This will help us to track newest tweets
    this.graph[userId].posts.push({tweetId: tweetId, time: this.time++ });
};

/** 
 * @param {number} userId
 * @return {number[]}
 */
Twitter.prototype.getNewsFeed = function(userId) {
    // User does not exist
    if (!(userId in this.graph)) {
        return [];
    }

    let visited = new Set();

    // Get based on max tweets
    let maxHeap = new PriorityQueue({
        compare: (a, b) => b.time - a.time
    });
    this.dfs(userId, visited, maxHeap);
    // Add to the result after collecting all
    let result = [];
    for (let i = 0; i < 10; i++) {
        if (!maxHeap.isEmpty()) {
            result.push(maxHeap.dequeue().tweetId);    
        }
    }
    return result;
};

Twitter.prototype.dfs = function(node, visited, heap) {
    // Avoid cycles
    if (visited.has(node)) {
        return;
    }
    // Mark as visited
    visited.add(node);
    // Add all posts for the current user
    for (let post of this.graph[node].posts) {
        heap.enqueue(post);
    }
    
    for (let neighbor of this.graph[node].following) {
        this.dfs(neighbor, visited, heap);
    }
}
/** 
 * @param {number} followerId 
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.follow = function(followerId, followeeId) {
    if (!(followerId in this.graph)) {
        this.graph[followerId] = {posts: [], following: []};
    }
    if (!(followeeId in this.graph)) {
        this.graph[followeeId] = {posts: [], following: []};
    }
    this.graph[followerId].following.push(followeeId);
};

/** 
 * @param {number} followerId 
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.unfollow = function(followerId, followeeId) {
    if (!(followerId in this.graph)) {
        return;
    }
    let tmp = [];
    // Only insert into tmp the users that are not the same
    // as the user we want to remove
    for (let following of this.graph[followerId].following) {
        if (following !== followeeId) {
            tmp.push(following);
        }
    }
    // Update the value
    this.graph[followerId].following = tmp;
};