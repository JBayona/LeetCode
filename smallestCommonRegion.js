/*
You are given some lists of regions where the first region of each list includes all other regions in that list.

Naturally, if a region X contains another region Y then X is bigger than Y.

Given two regions region1, region2, find out the smallest region that contains both of them.

If you are given regions r1, r2 and r3 such that r1 includes r3, it is guaranteed there is no r2 such that r2 includes r3.

It's guaranteed the smallest region exists.

https://leetcode.com/problems/smallest-common-region/
https://memorylimitexceeded.gitlab.io/leetcode/problems/1257-smallest-common-region.html
*/

// Time O(N)
// Space O(N)
var findSmallestRegion = function(regions, region1, region2) {
    let parent = {};
    let ancestors = new Set();
    
    // Create a parent for each region
    for (let region of regions) {
        for (let i = 1; i < region.length; i++) {
            let r = region[i];
            parent[r] = region[0];
        }
    }

    // Add all the regions'1 ancestor
    while(region1) {
        ancestors.add(region1);
        // Go deep level
        region1 = parent[region1];
    }

    // Try to find common ancestor from bottom-up
    // first matching is the lowers ancestor
    while (!ancestors.has(region2)) {
        region2 = parent[region2];
    }

    return region2;
};


/*regions = [["Earth","North America","South America"],
["North America","United States","Canada"],
["United States","New York","Boston"],
["Canada","Ontario","Quebec"],
["South America","Brazil"]];
region1 = "Quebec";
region2 = "New York";*/
regions = [["Earth", "North America", "South America"],["North America", "United States", "Canada"],["United States", "New York", "Boston"],["Canada", "Ontario", "Quebec"],["South America", "Brazil"]];
region1 = "Canada";
region2 = "South America";
console.log(findSmallestRegion(regions, region1, region2));