/* A = [1, 2, 3, 4, 5]
N = 3
=>
[[1, 2, 3], [1, 2, 4], [1, 2, 5], .... ] */

function group(A, N) {
// 请补全代码
    let result = [];
    let childResult=[];
    for(let i = 0 ;i < A.length; i++){
        if(A.length >= N){
            childResult = Object.assign([],createTree(i,A,N));
            if(i === 2) debugger
            console.log('childResult',childResult)
            result = [...childResult,...result]
            console.log('result',result)
            A.shift()
        }else{
           break;
        }
    }
    return result
}
function createTree(index,arr,N){
    const result = [];
    let tempArr = [];
    loop = function(index){
        for(let i = index; i < arr.length ; i++){
            tempArr.push(arr[i]);//存字符串到数组
           if(tempArr.length === N){//存储到足够的字符串，保存到结果集中
               result.push(JSON.parse(JSON.stringify(tempArr)));
               tempArr.pop();
               if(i === arr.length - 1){
                  let obj = tempArr.pop();
                  if(tempArr.length){
                      let index = arr.findIndex(item => item === obj);
                      if(index > -1 && arr.length - index + tempArr.length >= N){
                         loop(index + 1 )
                      }else{
                          return result
                      }
                  }
               }
    
           }
        }
        return result;
    }
    loop(index)

    return result;
}
group([ 1,2, 3, 4, 5],4)


