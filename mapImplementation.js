/*
Implement data structure “Map” storing pairs of integers (key, value) and define following member functions in O(1) runtime: 
void insert(key, value), void delete(key), int get(key), int getRandomKey().

http://blog.gainlo.co/index.php/2016/08/14/uber-interview-question-map-implementation/

Para hacer operaciones O(1), un hash es la opcion que debemos pensar, con un hashmap, facilmente podemos conseguir
operaciones de O(1) en INSERT, GET  y DELETE, lo que lo hace interesante es el randomKey ya que no puedes hacerlo
en O(1), para esto usamos un arreglo auxiliar para tener todos los keys del hash, estos keys dentro del array deben
de coincidir en la posicion que aparecen que tienen en el index, asi siempre que eliminemos o agreguemos valores
siempre estaran en el rango de n - length, asi nuestro random siempre generara un index random en donde aun tenemos
elementos en el hash.

Para eliminar suponemos que tenemos [1,4,2,5,9] y queremos eliminar el 2, en lugar de recorrer a la izquierda el 5 y 9
hacemos un swap de 2 y 9 reduciendo el length-1, de tal forma que hasta atras vamos a tener todos los elementos elimnados
y el length tendra solo el numero de los que aun persisten que seran los de hasta adelante.
*/

class Map{
  constructor(){
    this.hashmap = {};
    this.array = [];
    this.length = 0;
  }
  insert(key,value){
    if(!(key in this.hashmap)){
      let index = this.length;
      this.hashmap[key] = {val:value, idx: index};
      this.array[index] = key;
      this.length += 1;
    }
  };
  getKey(key){
    return this.hashmap[key].val;
  }
  deleteVal(key){
    if(key in this.hashmap){
      //First delete the key from the array
      let index = this.hashmap[key].idx;
      /*We dont delete the element in the array, instead
      we move the element and we decrease the length of the array*/
      /*Hacemos swap para que en nuestro arreglos de keys, posteriormente
      podamos actualizar el index con el index del elemento eliminado*/
      [this.array[index], this.array[this.length-1]] = [this.array[this.length-1], this.array[index]];
      //this.array.splice(index,1);
      this.length -=1;
      //Delete from the map
      delete this.hashmap[key];
      //Update the index of the swapped key
      /*En caso que coincida que tiene el mismo
      index eliminado*/
      if(this.hashmap[this.array[index]]){
        this.hashmap[this.array[index]].idx = index;
      }
    }
  }
  getRandomKey(){
    let random = Math.floor(Math.random() * this.length);
    return this.array[random];
  }
}

let map = new Map();
map.insert(1, "Hi");
map.insert(1, "Hi");
map.insert(2, "Jorge");
map.insert(3, "Alberto");
map.insert(4, "Bayona");
map.insert(5, "Test1");
map.insert(6, "Test2");
//console.log(map);
map.deleteVal(2);
map.deleteVal(5);
map.deleteVal(3);
console.log(map);
console.log(map.getRandomKey());
