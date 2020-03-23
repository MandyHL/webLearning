function* helloWorldGenerator(){
    yield 'hello';
    yield 'world';
    return 'ending';
}

var hw = helloWorldGenerator()


//Generator函数是一个状态机，封装了多个内部状态
//分段执行，yield表达式是暂停执行的标记，而next方法可以恢复执行
function* gen(){
    yield 123+456;
}

function* f(){
    console.log('执行了')
}
var generator = f();

setTimeout(function(){
    generator.next()
},2000)

var arr = [1, [[2, 3], 4], [5, 6]];
var flat = function* (a){
    var length = a.length;
    for(var i=0;i<length;i++){
        var item = a[i];
        if(typeof item !== 'number'){
            yield* flat(item)
        }else{
            yield item;
        }
    }
 
       
 
}

for(var f of flat(arr)){
    console.log(f)
}

// yield表达式如果在另一个表达式之中，必须放在圆括号里面
function* demo(){
    console.log('Hello' + (yield));
    console.log('Hello' + (yield 123))
}

// yield表达式用作函数参数或者放在赋值表达式的右边，可以不加括号
function* demo(){
    foo(yield 'a',yield 'b');
    let input = yield;
}

//由于Generator函数就是遍历器生成函数，因此可以把Generator赋值给对象Symbol.iterator属性，
//从而使得该对象具有Iterator接口

function* fibonacci(){
    let [prev,curr]=[0,1];
    for(;;){
        yield curr;
        [prev,curr]=[curr,prev + curr]
    }
}
for(let n of fibonacci()){
    if(n>1000)break;
    console.log(n)
}

function* objectEntries(obj){
    let propKeys = Reflect.ownKeys(obj);

    for(let propKey of propKeys){
        yield [propKey,obj[propKey]]
    }
}

// for(let [key,value] of objectEntries(jane)){
//     console.log(`${key}:${value}`)
// }

function* objectEntries(){
    let propKeys = Object.keys(this);

    for(let propKey of propKeys){
        yield [propKey,this[propKey]]
    }
}


let jane = {first:'Jane',last:'Doe'}
jane[Symbol.iterator] = objectEntries;

for(let [key,value] of jane){
    console.log(`${key}:${value}`)
}