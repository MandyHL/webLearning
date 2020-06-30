var findMedianSortedArrays = function(nums1, nums2) {
    let arr = [...nums1,...nums2];
        arr.sort((a,b) => a - b);
    let len = arr.length;
    let mid = len %2;
    if(mid === 0){
        let min = parseInt((1+len)/2 - 1)
        let max = min + 1;
        return((arr[min]+ arr[max]) /2);
    }else{
            return arr[(1+len)/2 - 1]
        }

};

console.log(findMedianSortedArrays([1,2],
    [3,4]))