function reverseNumber(n) {
    let number = 0;
    while (n) {
        number = (number * 10) + (n % 10);
        n = Math.floor(n / 10);
    }
    return number;
}

n = 12345;
console.log(reverseNumber(n));