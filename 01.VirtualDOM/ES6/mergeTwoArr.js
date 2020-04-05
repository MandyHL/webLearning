// var merge = function (nums1, m, nums2, n) {
//     let arr = [...nums1];
//     let point1 = 0;
//     let point2 = 0;
//     let p = 0;
//     while ((point1 < m) &&  (point2 < n )) {
//        nums1[p++] = (arr[point1] < nums2[point2])? arr[point1++] : nums2[point2++]
//     }
//     if (point1 < m)
//       arrayCopy(arr, point1, nums1, point1 + point2, m + n - point1 - point2);
//     if (point2 < n)
//       arrayCopy(nums2, point2, nums1, point1 + point2, m + n - point1 - point2);

//     function arrayCopy(src, srcIndex, dest, destIndex, length) {
//         dest.splice(destIndex, length, ...src.slice(srcIndex, srcIndex + length));
//     }
// };

// console.log(merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3))

var merge = function (nums1, m, nums2, n) {
  let point1 = m - 1;
  let point2 = n - 1;
  let p = m + n - 1;
  while(point1 >=  0 && point2 >= 0){
    nums1[p--] = (nums1[point1] > nums2[point2])? nums1[point1--]:nums2[point2--]
  }
  arrCopy(nums2,0 ,nums1,0,point2 + 1)

  function arrCopy(sourceArr,sourceIndex,targetArr,targetIndex,length){
      targetArr.splice(targetIndex,length,...sourceArr.slice(sourceIndex,sourceIndex + length))
  }
  
};
