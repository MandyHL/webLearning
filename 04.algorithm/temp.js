function Stack(value) {
    this.value = value || [];
    this.top = -1; //栈顶位置
    this.length = this.value.length; //栈内元素总数
}
Stack.prototype.push = function (obj) {
    this.value.push(obj)
    this.top++;
    this.length = this.value.length;
}
Stack.prototype.pop = function () {
    let obj = this.value.pop()
    this.top--;
    this.length = this.value.length;
    return obj
}
Stack.prototype.clear = function () {
    this.value = []
    this.top = -1;
    this.length = this.value.length;
}
Stack.prototype.peek = function () { //查看栈顶元素
    if (this.value) return this.value[this.length - 1]
    else return null

} 

function group(A, N) { 
    let arr = [];
    for (let i = 0; i < A.length; i++) {
        if (A.length >= N) {
            arr = Object.assign([],arr,createdTree(A, N))
            A.shift()
        } else {
            return arr
        }
    }
    return arr
}

function createdTree(arr, N) {
    let tmpArr = [];
    let stack = new Stack()
    let loop = function (index) {
        for (let i = index; i < arr.length; i++) {
            stack.push(arr[i]);
            if (stack.length === N) {
                tmpArr.push(JSON.parse(JSON.stringify(stack.value)));
                stack.pop()
                if (i === arr.length - 1) {
                    let obj = stack.pop()
                    if (stack.length) {
                        let index = arr.findIndex(item => item === obj)
                        if (index !== undefined && (arr.length - index + stack.length) >= N ) {
                            loop(index + 1)
                        } else {
                            return tmpArr
                        }
                    } else {
                        return tmpArr
                    }
                }
            }
        }
    }
    loop(0)
    return tmpArr
}

console.log(group([1, 2, 3, 4, 5,6,7,8,9,10], 4)) //[ 

