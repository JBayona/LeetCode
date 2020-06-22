/*


- /foo
  - /images
    - /foo.png  <------.
  - /temp              | same file contents
    - /baz             |
      - /that.foo  <---|--.
  - /bar.png  <--------'  |
  - /file.tmp  <----------| same file contents
  - /other.temp  <--------'
  - /blah.txt

input: "/foo" <-- string, is complete path
output:

  [
     ['/foo/bar.png', '/foo/images/foo.png'],
     ['/foo/file.tmp', '/foo/other.temp', '/foo/temp/baz/that.foo']
  ]

function isDir(string path) bool {}
function listDir(string path) []string {} 
   "/foo" -> "images", "temp", "bar.png", "file.tmp", "other.temp", "blah.txxt"
function joinPath(string path, string subPath) string {}
   "/foo", "images" -> "/foo/images"


*/

/*
[
     ['/foo/bar.png', '/foo/images/foo.png'],
     ['/foo/file.tmp', '/foo/other.temp', '/foo/temp/baz/that.foo']
  ]

*/

/*
{
"abc": [/foo/bar.png, '/foo/images/foo.png'],
"def : ['/foo/file.tmp', /foo/other.temp,/foo/temp/baz/that.foo ]
}
*/

const findDuplicate = function(str) {
    if(!str) {
      return [];
    }
    
    if(!isDir(str)) {
      return [];
    }
    
    let hash = {};
    helper(str, hash);
    
    let output = [];
    for(let content in hash) {
      output.push(hash[content]);
    }
    return output;
  }
  
  function helper(path, hash) {
    if(!isDir(path)) {
      return getFileContent(path);
    }
    
    let levels = listDir(path); 
    for(let level of levels) {
      let newPath = joinPath(path, level);
      if(isDir(newPath)) {
        content = helper(newPath, hash);
      } else {
        content = getFileContent(newPath);
      }
      if(hash[content]) {
        hash[content].push(newPath);
      } else {
        hash[content] = [newPath];
      }
    }
  }
  
  function getFileContent(file) {
    // Ecrypt file content using MD5, SHA-1, etc etc
    let key = MD5(file);
    return key;
  }
  
  /*
  {
  "sdgdfg345gfhtdg": [/, /....]
  }
  */