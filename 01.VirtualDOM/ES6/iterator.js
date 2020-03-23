class RangeIterator {
    constructor(start,stop){
        this.value = start;
        this.stop = stop;
    }
    [Symbol.iterator](){return this;}
    next(){
        var value = this.value;
        if(value < this.stop){
            this.value++;
            return {done:false,value:value}
        }
        return {done:true,value:undefined}
    }
}
function range(start,stop){
    return new RangeIterator(start,stop)
}

for(var value of range(0,3)){
    console.log(value);
}

let obj = {
    data:['hello','world'],
    [Symbol.iterator](){
        const self = this;
        let index = 0;
        return {
            next(){
                if(index < self.data.length){
                    return {
                        value:self.data[index++],
                        done:false
                    }
                }else{
                    return{value:undefined,done:true}
                }
            }
        }
    }
}

let iterable ={
    0:'a',
    1:'b',
    2:'c',
    length:3,
    [Symbol.iterator] : Array.prototype[Symbol.iterator]
};
for(let item of iterable){
    console.log(item)
}

var someString = 'hi';
typeof someString[Symbol.iterator];

var iterator = someString[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

//遍历器对象除了具有next()方法外，还可以具有return 方法和throw方法

//如果一个对象咋完成遍历前，需要清理或释放资源，就可以部署return方法
function readLinesSync(file){
    return {
        [Symbol.iterator](){
            return{
                next(){
                    return {done:false}
                },
                return(){
                    file.close();
                    return{done:true}
                }
            }
        }
    }
}

const arr = ['red','green','blue'];
for(let v of arr){
    console.log(v)
}

const obj = {};
obj[Symbol.iterator] = arr[Symbol.iterator].bind(arr);

for(let v  of obj){
    console.log(v)
}

// for ... in循环只能获得对象的键名，不能直接获取键值
//for ...of循环，允许遍历获得键值(数组的遍历器接口只返回具有数字索引的属性)
var arr = ['a','b','c','d'];
for(let a in arr){
    console.log(a)
}

for(let v of arr){
    console.log(v)
}


//JavaScript无法中途跳出forEach循环，break命令或return命令都不能奏效