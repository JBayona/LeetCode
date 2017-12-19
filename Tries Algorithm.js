/*
Arboles de caracteres, cada nodo tiene un caracter
*/

var trie = {
  children: {},
  count: 0
};

function add(str){
  let node = trie;
  for(let i = 0; i < str.length; i++){
    //Asigna el nodo si lo encuentra o agrega un elemento para agregarlo al trie
    node.children[str[i]] = node.children[str[i]] || {children: {}, count: 0};
    //Recorre el nodo
    node = node.children[str[i]];
    //Cuenta las ocurrencias hasta ese punto
    node.count++;
  }
}

function find(str){
  let node = trie;
  for(let i = 0; i < str.length; i++){
    if(!node.children[str[i]]){
      return 0;
    }
    node = node.children[str[i]];
  }
  return node.count;
}

add('hacker');
add('hackerisk');
add('hackerrank');
console.log(find('hacker'));
console.log(find('hackeri'));
console.log(find('hackerr'));
console.log(find('hackerrank'));
console.log(trie);