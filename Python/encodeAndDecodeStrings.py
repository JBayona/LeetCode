"""
roblem: Design an algorithm to encode a list of strings to a string. The encoded string is
then sent over the network and is decoded back to the original list of strings. Please implement encode and decode

Example(s):

Example1
Input: [“lint”,“code”,“love”,“you”] Output: [“lint”,“code”,“love”,“you”] Explanation:
One possible encode method is: “lint:;code:;love:;you”

Example2
Input: [“we”, “say”, “:”, “yes”] Output: [“we”, “say”, “:”, “yes”] Explanation: One possible encode
method is: “we:;say:;:::;yes”

https://leetcode.com/problems/encode-and-decode-strings/
"""


def encode(strs):
    # write your code here
    res = ''
    for word in strs:
        encoded = str(len(word)) + '/' + word
        res += encoded
    return res


def decode(str):
    # write your code here
    index = 0
    result = []
    while index < len(str):
        tmp = index
        # Find slash
        while tmp < len(str) and str[tmp] != '/':
            tmp += 1
        slash = tmp
        # Get the size of the string
        size = int(str[index:slash])
        word = str[slash + 1, slash + 1 + size]
        # Move index
        index = slash + 1 + size
        # result.append(word)
    return result


test = ["we", "say", ":", "yes"]
result = encode(test)
print(result)
print(decode(result))
