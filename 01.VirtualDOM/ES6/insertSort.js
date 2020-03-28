function insertSort(arr) {
    var temp;
    debugger
    for (var i = 1; i < arr.length; i++) {
        temp = arr[i];
        for (var j = i; j > 0 && temp < arr[j - 1]; j--) {
            arr[j] = arr[j - 1]
        }
        arr[j] = temp
    }
    return arr
}

console.log(insertSort([3, 1, 8, 2, 5]))