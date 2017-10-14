
class Map{
  constructor(){
    this.hash = {};
    this.array = [];
    this.length = 0;
  }
  insert(key,value){
    if(!(key in this.hash)){
      let index = this.length;
      this.hash[key] = {val: value, idx: index};
      this.array[index] = key;
      this.length += 1;
    }
  }
  getValue(key){
    if(key in this.hash){
      return this.hash[key].val;
    }else{
      return "Not Found";
    }
  }
  deleteValue(key){
    if(key in this.hash){
      let index = this.hash[key].idx;
      //Swap length element with desired to delete
     [this.array[index], this.array[this.length-1]] = [this.array[this.length-1], this.array[index]];
     delete this.hash[key];
     this.length -= 1;

     //Esto siempre se tiene que cumplir puesto que solo cambiamos los valores
     if(this.hash[this.array[index]]){
      this.hash[this.array[index]].idx = index;

      console.log(this.array);
      console.log(this.hash);
     }
    }
  }
  getRandomKey(){
    let index = Math.floor(Math.random() * this.length);
    return this.array[index];
  }
}

const map = new Map();
map.insert(1,"Hola");
map.insert(2,"Como");
map.insert(3,"Estas");
map.insert(4,"Jorge");
console.log(map.getValue(1));
console.log(map.getValue(3));
map.deleteValue(3);
//console.log(map);
console.log(map.getRandomKey());
console.log(map.getRandomKey());
console.log(map.getRandomKey());
console.log(map.getRandomKey());