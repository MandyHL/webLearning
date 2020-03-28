function quickSort(arr){
    if(arr.length <2) return arr;
    let middle = Math.floor(arr.length/2);//Math.floor()向下取整
    let flag = arr.splice(middle,1)[0];//splice如果删除了元素，返回的将是含有被删除元素的书组
    let left = [];
    let right = [];
    for(let i =0;i<arr.length ;i++){
        if(arr[i] < flag){
            left.push(arr[i])
        }else{
            right.push(arr[i])
        }
    }
    return quickSort(left).concat([flag],quickSort(right))
}

let arr=[1,5,6,5,6,9,52,47,21,99,31,25,524,68,359]
console.log(quickSort(arr))


function findSubStr(str1, str2) {
    if (str1.length > str2.length) {
      [str1, str2] = [str2, str1]
    }
    var result = ''
    var len = str1.length
    debugger
    for (var j = len; j > 0; j--) {
      for (var i = 0; i < len - j; i++) {
        result = str1.substr(i, j)
        if (str2.includes(result)) return result
      }
    }
  }
  console.log(findSubStr('aabbcc11', 'ppooiiuubcc123'))