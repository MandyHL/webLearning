function mergeSort(array){
    debugger
    var result = array.slice(0);
    function sort(array){
        var length = array.length;
        var mid = Math.floor(length * 0.5);
        var left = array.slice(0,mid);
        var right = array.slice(mid,length);
        if(length === 1) return array;
        return merge(sort(left),sort(right))
    }
    function merge(left,right){
        var result = []
        while(left.length || right.length){
            if(left.length && right.length){
                if(left[0] < right[0]){
                    result.push(left.shift())
                }else{
                    result.push(right.shift())
                }
            }else if(left.length){
                result.push(left.shift())
            }else {
                result.push(right.shift())
            }
        }
        return result
    }

    return sort(result)
}

console.log(mergeSort([5, 2, 8, 3, 6]))
