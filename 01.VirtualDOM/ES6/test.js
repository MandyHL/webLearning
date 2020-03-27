let userNum = 0; //用户个数
let loveLevelArr = []; //用户喜好程度
let queryNum = 0; //查询组数
let queryCommand = [];
let arr = [];


var input = function getQueryData() {
  userNum = parseInt(readline());

  loveLevelArr = readline().split(' ');

  queryNum = parseInt(readline());

  for (let i = 0; i < queryNum; i++) {
    queryCommand[i] = readline().split(' ');
  }
  loveLevelArr.forEach((item, index) => {
    if (arr[item] == undefined) {
      arr[item] = [];
    }
    arr[item].push(index)
  })
  
}



var result = function getResult() {
  for (let i = 0; i < queryNum; i++) {
    let start = queryCommand[i][0] - 1;
    let end = queryCommand[i][1] - 1;
    let value = queryCommand[i][2];
    let num = 0;
    if (arr[value] == undefined) { //数组元素未定义，说明没有与之匹配的喜好苏
      console.log(0)
    } else {
      arr[value].forEach(item => {
        if (item >= start && item <= end)
          num++
      })
      console.log(num)
    }
  }
}
input();
result();