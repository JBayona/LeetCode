/*
Given an array of one or more vanity codes and an array of phone numbers, write a function to find all
phone numbers that match one or more vanity codes. The output must be a sorted array of unique phone
numbers from the input array of numbers

2 = abc, 3 = def, 4 = ghi, 5 = jkl, 6 = mno, 7 = pqrs, 8 = tuv, 9 = xxyz
*/

function vanity(codes, numbers) {
  mapping = {
      "A": 2, "B": 2, "C": 2, "D": 3, "E": 3, "F": 3, "G": 4,
      "H": 4, "I": 4, "J": 5, "K": 5, "L": 5, "M": 6, "N": 6,
      "O": 6, "P": 7, "Q": 7, "R": 7, "S": 7, "T": 8, "U": 8,
      "V": 8, "W": 9, "X": 9, "Y": 9, "Z": 9
  }
  let result = set()

  for(word of codes) {
    for(let i = 0; i < word.length; i++) {
      if(word[i] in mapping) {
        word = word.replace(word[i], str(mapping[word[i]]));
      }
    }
    for(let i = numbers.length -1; i >= 0; i--) {
      if(!(result.has(word) && numbers.includes(word)) {
        result.push(numbers[i]);
        numbers.splice(i, 1); // Remove one element
      }
    }
  }
  return Array.from(set).sorted();
}

def vanity(codes, numbers):
    # Write your code here
    print(codes)
    print(numbers)
    mapping = {
        "A": 2, "B": 2, "C": 2, "D": 3, "E": 3, "F": 3, "G": 4,
        "H": 4, "I": 4, "J": 5, "K": 5, "L": 5, "M": 6, "N": 6,
        "O": 6, "P": 7, "Q": 7, "R": 7, "S": 7, "T": 8, "U": 8,
        "V": 8, "W": 9, "X": 9, "Y": 9, "Z": 9
    }
    result = set()

    for word in codes:
        for i in range(len(word)):
            if word[i] in mapping:
                word = word.replace(word[i], str(mapping[word[i]]))
        for i in range(len(numbers) - 1, - 1, -1):
            if word not in result and word in numbers[i]:
                result.add(numbers[i])
                numbers.pop(i)
    return sorted(list(result))

codes = ['TWLO'];
numbers = ['+14157088956', '+151099926333', '+17474824380', '+1415123456'];
console.log(vanity(codes, numbers));