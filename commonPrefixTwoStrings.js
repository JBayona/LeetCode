function commonPrefix(str1,str2){
	for(var i = 0; i < str1.length; i++){
	  if(str1[i] != str2[i]){
		return i === 0 ? '' : str1.substring(0,i);
	  }
	}
	return str1;
}

str1 = "geeksforgeek";
str2 = "geek";
console.log(commonPrefix(str1,str2));
