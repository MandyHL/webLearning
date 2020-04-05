

      var twoSum = function(nums, target) {
      let i = nums.length - 1;
      while(i > 0){
        let last = nums.pop();//删除最后一个元素
        let sub = target - last;//需要查找的差值
        let subIndex = nums.indexOf(sub)
        if(subIndex > -1){
          return([subIndex,nums.length])
        }
        i--;
      }
    };
    console.log(twoSum([3,2,4],6))