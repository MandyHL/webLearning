function findSubStr(str1,str2){
    if(str1.length > str2.length){
        [str1,str2] = [str2,str1]
    }
    let len = str1.length;
    for(let j = len;j>0;j--){
        for(let i=0;i< len - j;i++){
            let result = str1.substr(i,j);
            if(str2.includes(result))
            return result;
        }
    }
}


console.log(findSubStr('aabbcc11', 'ppooiiuubcc123'))