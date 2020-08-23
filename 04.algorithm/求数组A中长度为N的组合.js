/* A = [1, 2, 3, 4, 5]
N = 3
=>
[[1, 2, 3], [1, 2, 4], [1, 2, 5], .... ] */

function group(A, N) {
    // 请补全代码
    let result = [];
    let childResult = [];
    if (N === 0) {
        return [];
    } else if (N === 1) {
        result = A.map(item => [item])
    } else if (A.length === N) {
        result = [A]
    }else {
        for (let i = 0; i < A.length; i++) {
            if (A.length >= N && A.length - i >= N) {
                childResult = Object.assign([], createTree(i, A, N));//数组是引用类型，注意深浅拷贝
                result = [...result, ...childResult]
            } else {
                break;
            }
        }
    }
    return result
}
function createTree(index, arr, N) {
    const result = [];
    let tempArr = [];
    loop = function (index) {
        for (let i = index; i < arr.length; i++) {
            tempArr.push(arr[i]);//存字符串到数组
            if (tempArr.length === N) {//存储到足够的字符串，保存到结果集中
                result.push(JSON.parse(JSON.stringify(tempArr)));//数组是引用类型，注意深浅拷贝
                tempArr.pop();
                if (i === arr.length - 1) {//指针到达最后位置，向上回溯
                    uploop = function(){//回溯的函数
                        let obj = tempArr.pop();
                        let index = arr.findIndex(item => item === obj);
                        if (index > -1 && arr.length - index + tempArr.length >= N) {//还有足够的字符串再继续循环
                            loop(index + 1)
                        }
                    }
                    uploop();//执行回溯
                    if (tempArr.length) { // 可一直回溯到数组只剩下首元素
                        uploop()
                    }
                }
            }
        }
        return result;
    }
    loop(index)
    return result;
}
console.log(group([1, 2, 3, 4, 5,6], 4))


