/*
# Write a function that splits a long SMS string into smaller pieces.
# Each piece should be less than or equal to 160 characters and include
# a formatted index counter at the end (for example, “ (2/5)”). The function
# should avoid breaking words into pieces. If a word does not fit, it should
# go to the next SMS.
#
# Example
#
# Input:
# SMS=”Imagine that this is a long message with a large number of characters...”
#
# Output:
# [ ”Imagine that this is a long message (1/3)”,
#  ”with a large number of (2/3)”,
#  ”characters... (3/3)” ]
*/ 

// length / limit 

const splitMsg = (text, maxWidth) => {
  let words = text.split(" ");
  let result = [];
  let currentLength = 0;
  let numWords = 0;
  let line = [];
  // Is limit counter needed to consider for padding?
  let limitCounter = 6;
  let totalPages = Math.ceil(text.length / maxWidth);
  let currentPage = 1;
  
  for (let word of words) {
      // We can fit words into a message
      if(currentLength + word.length + numWords <= maxWidth) {
          line.push(word);
          currentLength += word.length;
          numWords++;
      } else {
          // Push a result
          result.push(format(line, currentPage, totalPages));
          // Clean
          line = [];
          line.push(word);
          currentLength = word.length;
          numWords = 1;
          currentPage++;
      }
  }
  // Last line
  let last = line.join(" ") +  (${currentPage}/${totalPages});
  result.push(last);
  
  return result;
}

function format(line, currentPage, totalPages) {
  return line.join(' ') +  (${currentPage}/${totalPages});
}


let msg= "octogons we octogons octogons";
console.log(splitMsg(msg, 20));