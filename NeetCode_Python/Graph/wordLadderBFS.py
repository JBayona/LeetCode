
# // Option 1
# // Time O(V + E)
# // Space O(V + E)
class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        
        if beginWord == endWord:
            return 0
        
        words = set(wordList)
        visited = set()

        queue = [(beginWord, 1)]
        while len(queue):
            tam = len(queue)
            for i in range(tam):
                word, d = queue.pop(0)
                if word == endWord:
                    return d
                for index, _ in enumerate(word):
                    for k in range(26):
                        c = chr(97 + k)
                        w = word[0:index] + c + word[index+1:]
                        if (w not in words) or (w in visited):
                            continue
                        
                        visited.add(w)
                        queue.append((w, d + 1))
        return 0
