/*
set(A, 1)
get(A) // 1
set(B, 9)
get(B) // 9
set(C, A+B)
get(C) // 10

function set(string, val)
function get(string)
*/
class Cells {
    constructor() {
        this.hash = {};
    }
    set(key, val) {
        this.hash[key] = val;
    }
    get(key) {
        if(!(key in this.hash)) {
            return 0;
        }
        if(this.isExpresion(this.hash[key])) {
            return this.getExpression(this.hash[key]);
        }
        return this.hash[key];
    }
    isExpresion(elem) {
        if(isNaN(elem)) {
            return true;
        }
        return false;
    }
    getExpression(elem) {
        let array;
        if(elem.includes('+')) {
            array = elem.split('+');
            return this.get(array[0]) + this.get(array[1]);
        } else if(elem.includes('-')) {
            array = elem.split('-');
            return this.get(array[0]) - this.get(array[1]);
        } else if(elem.includes('*')) {
            array = elem.split('*');
            return this.get(array[0]) * this.get(array[1]);
        } else if(elem.includes('/')) {
            array = elem.split('/');
            return this.get(array[0]) / this.get(array[1]);
        }
    }
}

let cell = new Cells();
cell.set('A1', 1);
cell.set('B1', 2);
console.log(cell.get('A1'));
console.log(cell.get('B1'));
console.log(cell.get('C1'));
cell.set('C1', 'A1+B1');
console.log(cell.hash);
console.log('Expression');
console.log(cell.get('C1'));
cell.set('A1', 3);
console.log(cell.hash);
console.log('Expression');
console.log(cell.get('C1'));
cell.set('B1', 4);
console.log(cell.hash);
console.log('Expression');
console.log(cell.get('C1'));
cell.set('D1', 'A1*B1');
console.log(cell.get('D1'));
console.log(cell.hash);
