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
  node.word = str;
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

var trie2 = {
  children: {},
  count: 0
};


function add2(str){
  let node = trie2;
  let c = '';
  for(let i = 0; i < str.length; i++){
    //Asigna el no do si lo encuentra o agrega un elemento para agregarlo al trie
    c  += str[i];
    node.children[c] = node.children[c] || {children: {}, count: 0};
    //Recorre el nodo
    node = node.children[c];
    //Cuenta las ocurrencias hasta ese punto
    node.count++;
  }
  node.word = str;
}

function find2(str){
  let node = trie2;
  let c = '';
  for(let i = 0; i < str.length; i++){
    c += str[i]
    if(!node.children[c]){
      return 0;
    }
    node = node.children[c];
  }
  return node.count;
}

// Option 1
add('hacker');
add('hackerisk');
add('hackerrank');
console.log(find('hacker'));
console.log(find('hackeri'));
console.log(find('hackerr'));
console.log(find('hackerrank'));
console.log(trie);

// Option 2
add2('hacker');
add2('hackerisk');
add2('hackerrank');
console.log(find2('hacker'));
console.log(find2('hackeri'));
console.log(find2('hackerr'));
console.log(find2('hackerrank'));
console.log(trie);