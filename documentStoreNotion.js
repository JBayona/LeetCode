class DocStore {
  constructor() {
    this.hash = {};
  }
  save(docName, text) {
    if (!(docName in this.hash)) {
      this.hash[docName] = [];
    }
    let ts = new Date().getTime();
    this.hash[docName].push({ ts, text });
  }
  load(docName) {
    if (!(docName in this.hash)) {
      return "Document not found!";
    }
    let docs = this.hash[docName];
    return docs[docs.length - 1].text;
  }
  loadFromTime(docName, time) {
    if (!(docName in this.hash)) {
      return "Document not found!";
    }
    let docs = this.hash[docName];
    for (let i = 1; i < docs.length; i++) {
      let doc = docs[i];
      if (doc.ts > time) {
        return docs[i - 1].text;
      }
    }
    return docs[docs.length - 1].text;
  }
}


const docStore = new DocStore();
docStore.save('foo', 'Hello World!');
console.log(docStore.load('foo'));
let ts = new Date().getTime();
docStore.save('foo', 'Good bye!');
console.log(docStore.load('foo'));
docStore.save('foo', 'I was joking');
console.log(docStore.load('foo'));
console.log(docStore.loadFromTime('foo', ts));
console.log(docStore.hash);