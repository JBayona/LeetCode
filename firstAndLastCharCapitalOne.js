/*
You are given an array "a"containing a list of strings, construct an array of the same length
where the ith element is a 2 character string formed by the first characer of a[i] concatenated
by the last character of a[i + 1]. If there's no a[i + 1] cycle back to the beginning of the array
in other words,  for the final element concatenate the first character of a[a.length - 1] with the
last character of a[0]

Example = a [cat, dog, ferret, scorpion] 
solution = [cg dt fn st]
*/

function firstAndLastChar(arr) {
    const result = [];
    const n = arr.length;

    for (let i = 0; i < n; i++) {
        let firstChar = arr[i][0];
        let nextIndex = (i + 1) % n; // This will cycle back to 0 when i is the last index
        let lastChar = arr[nextIndex][arr[nextIndex].length - 1];
        result.push(firstChar + lastChar);
    }

    return result;
}
console.log(firstAndLastChar(["cat", "dog", "ferret", "scorpion"])); // ["cg", "dt", "fn", "st"]