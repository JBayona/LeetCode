"""
Given a string, we can "shift" each of its letter to its successive letter 
for example: "abc" -> "bcd". We can keep "shifting" which forms
the sequence:  "abc" -> "bcd" -> ... -> "xyz" Given a list of non-empty strings which
contains only lowercase alphabets, group all strings that belong to the same
shifting sequence.
Example:
Input: ["abc", "bcd", "acef", "xyz", "az", "ba", "a", "z"], 
Output:  [   ["abc","bcd","xyz"],   ["az","ba"],   ["acef"],   ["a","z"] ]
"""

# Total lowercase letter 
ALPHA = 26
 
# Method to a difference string 
# for a given string. If string 
# is "adf" then difference string 
# will be "cb" (first difference 
# 3 then difference 2) 
def getDiffString(str):
    shift=""
    for i in range(1, len(str)):
        dif = (ord(str[i]) - ord(str[i - 1]))

        if(dif < 0):
            dif += ALPHA
 
        # Representing the difference as char 
        shift += chr(dif + ord('a'))
    return shift
 
# Method for grouping 
# shifted string 
def groupShiftedString(list):
    groupMap = {}
 
    for str in list:
        diff = getDiffString(str)
        if diff in groupMap:
            groupMap[diff].append(str)
        else:
            groupMap[diff] = [str]

    # Format the result
    result = []
    for it in groupMap:
        word = groupMap[it]
        result.append(word);
    return result
         
str = ["abc", "bcd", "acef", "xyz", "az", "ba", "a", "z"]
print(groupShiftedString(str))