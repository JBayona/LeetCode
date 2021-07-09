 """
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
"""

class Solution(object):
    def convert(self, s, numRows):
        """
        :type s: str
        :type numRows: int
        :rtype: str
        """
        response = ['' for i in range(numRows)]
        down = True
        row = 0
        
        if numRows == 1:
            return s
        
        for i in range(len(s)):
            response[row] += s[i]
            # If we have reached the bottom, we need to go up
            if(row == numRows - 1):
                down = False
            elif row == 0: # Go down if we reached the top
                down = True
            
            if down:
                row += 1
            else:
                row -= 1
        
        return ''.join(response)
        