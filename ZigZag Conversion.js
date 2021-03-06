 /*
The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)
P   A   H   N
A P L S I I G
Y   I   R
And then read line by line: "PAHNAPLSIIGYIR"
Write the code that will take a string and make this conversion given a number of rows:
string convert(string text, int nRows);
convert("PAYPALISHIRING", 3) should return "PAHNAPLSIIGYIR".

[ 'P', '', '' ]
[ 'P', 'A', '' ]
[ 'P', 'A', 'Y' ]
[ 'P', 'AP', 'Y' ]
[ 'PA', 'AP', 'Y' ]
[ 'PA', 'APL', 'Y' ]
[ 'PA', 'APL', 'YI' ]
[ 'PA', 'APLS', 'YI' ]
[ 'PAH', 'APLS', 'YI' ]
[ 'PAH', 'APLSI', 'YI' ]
[ 'PAH', 'APLSI', 'YIR' ]
[ 'PAH', 'APLSII', 'YIR' ]
[ 'PAHN', 'APLSII', 'YIR' ]
[ 'PAHN', 'APLSIIG', 'YIR' ]
*/

// http://www.cnblogs.com/springfor/p/3889414.html
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */

var convert = function(s, numRows) {
    let array = new Array(numRows).fill('');
    let down;
    // Start the zigzag from top
    let row = 0;
    
    // Corner case, only one line
    if(numRows === 1) {
        return s;
    }
    
    for(let i = 0; i < s.length; i++) {
        // Add the element 
        array[row] += s[i];
        
        // If we reach the top, it´s time to go up
        if(row === numRows-1) {
            down = false;
        // It´s time to go down
        } else if(row === 0){
            down = true;
        }
        
        down ? row++ : row--;
    }
    return array.join('');
};

var convert = function(s, numRows) {
    var size = 2 * numRows - 2;
    var len = s.length;
    var result = '';
    var mid;
    var i;
    var j;
    
    if (numRows === 1) {
        return s;
    }
    
    for (i = 0; i < numRows; i++) {
        for (j = i; j < len; j += size) {
            result += s.charAt(j);
            
            // for the middle ones, excluding first row and last row
            if (i !== 0 && i !== numRows - 1) {
                mid = j + size - 2 * i;
                
                if (mid < len) {
                    result += s.charAt(mid);
                }
            }
        }
    }
    
    return result;
};

line = "PAYPALISHIRING";
rows = 3;
console.log(convert(line,rows));