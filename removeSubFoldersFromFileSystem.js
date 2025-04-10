/*
Given a list of folders folder, return the folders after removing all sub-folders in those folders.
You may return the answer in any order.

If a folder[i] is located within another folder[j], it is called a sub-folder of it. A sub-folder of
folder[j] must start with folder[j], followed by a "/". For example, "/a/b" is a sub-folder of "/a"
but "/b" is not a sub-folder of "/a/b/c".

The format of a path is one or more concatenated strings of the form: '/' followed by one or more
lowercase English letters.

For example, "/leetcode" and "/leetcode/problems" are valid paths while an empty string and "/" are not.
 
Example 1:
Input: folder = ["/a","/a/b","/c/d","/c/d/e","/c/f"]
Output: ["/a","/c/d","/c/f"]
Explanation: Folders "/a/b" is a subfolder of "/a" and "/c/d/e" is inside of folder "/c/d" in our filesystem.

Example 2:
Input: folder = ["/a","/a/b/c","/a/b/d"]
Output: ["/a"]
Explanation: Folders "/a/b/c" and "/a/b/d" will be removed because they are subfolders of "/a".

Example 3:
Input: folder = ["/a/b/c","/a/b/ca","/a/b/d"]
Output: ["/a/b/c","/a/b/ca","/a/b/d"]

https://leetcode.com/problems/remove-sub-folders-from-the-filesystem/description
*/
// Approach, append "/" to the end to make easier the comparison
// If the start of the folder was seen previously, it's
// a subfolder
// Time O(N)
// Space O(1)
var removeSubfolders = function (folder) {
  // Append "/" to each path, and sort.
  // This places all the parent folders before their subfolders.
  folder = folder.map((e) => e + "/").sort();

  // The first path is definitely a parent folder.
  let result = [folder[0]];

  // The current parent folder.
  let last = folder[0];

  for (let i = 1; i < folder.length; ++i) {
    // Is this not a child folder of the current parent?
    if (!folder[i].startsWith(last)) {
      // New parent, so save it.
      result.push(folder[i]);
      last = folder[i];
    }
  }

  // Remove "/" from each path, and return it.
  return result.map((path) => path.substring(0, path.length - 1));
};
