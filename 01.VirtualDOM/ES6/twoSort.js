
// 插入排序
function insertSort(arr) {
    var temp
    for (var i = 1; i < arr.length; i++) {
      temp = arr[i]
      for (var j = i; j > 0 && temp < arr[j - 1]; j--) {
        arr[j] = arr[j - 1]
      }
      arr[j] = temp
    }
    return arr
  }
  console.log(insertSort([3, 1, 8, 2, 5]))

// 归并排序
function mergeSort(array) {
    var result = array.slice(0)
    function sort(array) {
      var length = array.length
      var mid = Math.floor(length * 0.5)
      var left = array.slice(0, mid)
      var right = array.slice(mid, length)
      if (length === 1) return array
      return merge(sort(left), sort(right))
    }
    function merge(left, right) {
      var result = []

      while (left.length || right.length) {
        if (left.length && right.length) {
          if (left[0] < right[0]) {
            result.push(left.shift())
          } else {
            result.push(right.shift())
          }
        } else if (left.length) {
          result.push(left.shift())
        } else {
          result.push(right.shift())
        }
      }
      return result
    }
    return sort(result)
  }
  console.log(mergeSort([5, 2, 8, 3, 6]))

// 二分插入排序
function twoSort(array) {
    var len = array.length,
      i,
      j,
      tmp,
      low,
      high,
      mid,
      result
    result = array.slice(0)
    for (i = 1; i < len; i++) {
      tmp = result[i]
      low = 0
      high = i - 1
      while (low <= high) {
        mid = parseInt((high + low) / 2, 10)
        if (tmp < result[mid]) {
          high = mid - 1
        } else {
          low = mid + 1
        }
      }
      for (j = i - 1; j >= high + 1; j--) {
        result[j + 1] = result[j]
      }
      result[j + 1] = tmp
    }
    return result
  }
  console.log(twoSort([4, 1, 7, 2, 5]))