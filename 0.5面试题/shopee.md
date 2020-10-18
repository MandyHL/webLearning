<!--
 * @Author: your name
 * @Date: 2020-10-18 18:01:42
 * @LastEditTime: 2020-10-18 18:06:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webLearning\0.5面试题\shopee.md
-->

### 一面
##### 1.
```
let opt = {
  name: "hello",
  name2: this.name,
  say1:function(){
    return this.name;
  },
  say2: function(){
    setTimeout(function(){
      console.log(this.name);
    })
  },
  say3:function(){
    setTimeout(() => {
      console.log(this.name);
    })
  }
};

console.log(opt.name2); //1. undefined
console.log(opt.say1); //2. [Function:say1]
opt.say2(); //3. undefined
opt.say3(); //4. hello
```

##### 2.
以下代码的打印顺序是
```
let p = new Promise((resolve, reject) => {
    resolve(1);
    console.log(2);
  });
  
  setTimeout(() => console.log(3));
  
  p.then(res => {
    console.log(res);
    return 4;
  }).then(res => {
    console.log(res);
  })
  
  
  console.log(5);

```
##### 3.
```
  function Animal(name) {
    this.name = name;
  }
  
  let dog = new Animal('dog');
  
  
console.log(1,dog.prototype)
console.log(2,dog.__proto__ )
console.log(3,Animal.prototype)
console.log(4,Animal.prototype.__proto__ )
```
  
#### 4.

```
/**-------------------------------------------------
 * 将多层数组变成一层
 * flatten([0, [1, 2], 3]); //[0, 1, 2, 3]
 * flatten([{a: 1}, [1, [2, 3]], 4]); //[{a: 1}, 1, 2, 3, 4]
 * 请实现flatten函数，注意参数数组的元素不一定只是数字，可能是字符串或者对象等
 */

console.log(flatten([0,[1,2,3],4]))

console.log(flatten([{a: 1}, [1, [2, [{b: 0, c: [1]}, [5, [8, [9]]]]]], 4]));


function flatten(arr){
    
}
```

### 二面
实现一个cache缓存函数
```
// f1('abc', 123, { b: 3 });    // 5， 1000s
// f1('abc', 123, { b: 3 });    // 5， 1000s

function f1( ) {}
// f2 = cache(f1);
// f2('abc', 123, { b: 3 });    // 5， 1000s
// f2('abc', 456, { c: 3 });    // 3， 500s
// f2('abc', 123, { b: 3 });    // 5， 0s
function cache(fn) {
    const cache = {};
    return function (...args) {
        let _key = JSON.stringify(args);
        return cache[_key] || (cache[_key] = fn.apply(fn,args))

    }
}
let f2 = cache(f1)
console.log(f2('abc', 123, { a:2,b: 3 }))

console.log(f2('abc', 123, { b: 3,a:2 }))
```
