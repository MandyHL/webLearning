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