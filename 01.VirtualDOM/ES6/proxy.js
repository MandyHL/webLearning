//proxy的写法
var proxy = new Proxy(target, handler);

//proxy:在目标对象之前架设一层拦截，外界对该对象的访问，都必须先通过这层拦截。因此提供了一种机制，可以对外界的访问进行 过滤和改写
var obj = new Proxy({}, {
    get: function (target, propKey, receiver) {
        console.log(`gettign ${propKey}!`);
        return Reflect.get(target, propKey, receiver);
    },
    set: function (target, propKey, value, receiver) {
        console.log(`setting ${propKey}！`);
        return Reflect.set(target, propKey, value, receiver)
    }
})


obj.count = 1

    ++obj.count


//proxy实例也可以作为其他对象的原型对象
var proxy = new Proxy({}, {
    get: function (target, propKey) {
        return 35;
    }

})

let obj = Object.create(proxy);
console.log(obj.time)


//同一个拦截器函数，可以设置拦截多个操作
var handler = {
    get: function (target, name) {
        debugger
        if (name === 'prototype') {
            return Object.prototype;
        }
        return 'Hello,' + name
    },
    apply: function (target, thisBinding, args) { //拦截Proxy实例作为函数调用的的作操作
        debugger
        return args[0];
    },
    construct: function (target, args) { //拦截Proxy实例作为函数调用的操作
        debugger
        return {
            value: args[1]
        }
    }
}

var fproxy = new Proxy(function (x, y) {
    return x + y
}, handler)

console.log(fproxy(1, 2))
console.log(new fproxy(1, 2))
console.log(fproxy.__proto__)
console.log(fproxy.name)
console.log(fproxy(8, 1, 2, 5))

//get()方法用于拦截某个属性的读取操作，（目标对象，属性名，proxy实例本身）
var person = {
    name: '张三'
}

var proxy = new Proxy(person, {
    get: function (target, propKey) {
        if (propKey in target) {
            console.log(target[propKey])
            return target[propKey];
        } else {
            throw new Error(`Prop name ${propKey}does no exist.`)
        }
    }
})

proxy.name;
proxy.age; //如果没有拦截函数，访问不存在的属性，只会返回undefined

// get方法可以继承
let proto = new Proxy({}, {
    get(target, propertyKey, receiver) {
        debugger
        console.log('GET', +propertyKey);
        return target[propertyKey]
    }
})

let obj = Object.create(proto, {
    foo: {
        writable: true,
        configurable: true,
        value: 'hello'
    }
});
console.log(obj.foo)

//使用get拦截，实现数组读取附属的索引、
function createArray(...elements) {
    let handler = {
        get(target, propKey, receiver) {
            let index = Number(propKey);
            if (index < 0) {
                //如果数组的位置参数是-1，就会输出数组的倒数第一个成员
                propKey = String(target.length + index)
            }
            return Reflect.get(target, propKey, receiver);
        }
    }
    let target = [];
    target.push(...elements);
    return new Proxy(target, handler)
}
let arr = createArray('a', 'b', 'c')
console.log(arr[-1])

//利用Proxy,可以读取属性的操作(get),转变为执行某个函数，从而实现属性的链式操作
var pipe = function (value) {
    var funcStack = [];
    var oproxy = new Proxy({}, {
        get: function (pipeObject, fnName) {
            if (fnName === 'get') {
                //reduce()方法接受一个函数作为累加器
                return funcStack.reduce(function (val, fn) {
                    return fn(val);
                }, value)
            }
            funcStack.push(window[fnName]);
            return oproxy;
        }
    })
    return oproxy;
}
var double = n => n * 2
var pow = n => n * n;
var reverseInt = n => n.toString().split('').reverse().join('') | 0;

pipe(3).double.pow.reverseInt.get;

//set()方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象，属性名,属性值,Proxy实例本身
let validator = {
    set: function (obj, prop, value) {
        if (prop === 'name') {
            if (!Number.isInteger(value)) {
                throw new TypeError('The age is not an integer')
            }
            if (value > 200) {
                throw new RangeError('The age seems invalid')
            }
        }
        //对于满足条件的age属性及其他属性，直接保存
        obj[prop] = value;
    }
}

let person = new Proxy({}, validator);
person.age = 100;
console.log(person.age);
person.age = 'young'

//对象的内置属性，属性名的第一个字符使用下划线开头，表示这些属性不应该被外部使用

const handler = {
    get(target, key) {
        invariant(key, 'get');
        return target[key]
    },
    set(target, key, value) {
        invariant(key, 'set');
        target[key] = value;
        return true;
    }
};

function invariant(key, action) {
    if (key[0] === '_') {
        throw new Error(`Invalid attempt to ${action} private ${key} property`)
    }
}
const target = {};
const proxy = new Proxy(target, handler);

// proxy._prop

proxy._prop = 'c'


'assign' in Object
Reflect.has(Object, 'assign')

Proxy(target, {
    set: function (target, name, value, receiver) {
        var success = Reflect.set(target, name, value, receiver);
        if (success) {
            console.log(`property ${name} on ${target} set to ${value}`)
        }
        return success;

    }
})


var myObject = {
    foo: 1,
    bar: 2,
    get baz() {
        return this.foo + this.bar;
    }
}

console.log(Reflect.get(myObject, 'foo'));
console.log(Reflect.get(myObject, 'bar'));
console.log(Reflect.get(myObject, 'hello'))

//如果name属性部署了读取函数（getter),则读取函数的this绑定receiver
var myObject = {
    foo: 1,
    bar: 2,
    get baz() {
        console.log(this);
        return this.foo + this.bar;
    }
}

var myReceiverObject = {
    foo: 4,
    bar: 4
}

console.log(Reflect.get(myObject, 'baz', myReceiverObject))

//Reflect.set(target,name,value,receiver)
//设置target对象的name属性等于value

var myObject = {
    foo: 1,
    set bar(value) {
        return this.foo = value;
    }
}
console.log(myObject.foo)

Reflect.set(myObject, 'foo', 2)
console.log(myObject.foo)

Reflect.set(myObject, 'bar', 3)
console.log(myObject.foo) // 3

//如果name属性设置了赋值函数，则赋值函数的this绑定receiver
var myObject = {
    foo: 4,
    set bar(value) {
        console.log(this)
        return this.foo = value
    }
}

var myReceiverObject = {
    foo: 0
}

Reflect.set(myObject, 'bar', 1, myReceiverObject);
console.log(myObject.foo)
console.log(myReceiverObject.foo)


let p = {
    a: 'a'
};

let handler = {
    set(target, key, value, receiver) {
        console.log(target)
        console.log(key)
        console.log(value)
        console.log(receiver)
        console.log('set');
        Reflect.set(target, key, value)
    },
    defineProperty(target, key, attribute) {
        console.log('defineProperty');
        Reflect.defineProperty(target, key, attribute);
    }
};

let obj = new Proxy(p, handler);
obj.a = 'A';

//Reflect.has方法对应name in obj里面的in运算符。
var myObject = {
    foo: 1,
}

console.log('foo' in myObject);

console.log(Reflect.has(myObject, 'foo'))


//Reflect.deleteProperty(obj,name)用于删除对象的属性
var myObject = {
    foo: 1,
}
//旧写法
// delete myObject.foo;

//新写法
console.log(Reflect.deleteProperty(myObject, 'foo'))


//Reflect.construct(target,args)提供了一种不使用new ,来调用构造函数的方法
function Greeting(name) {
    this.name = name;
}

//new的写法
const instance = new Greeting('张三')

//Reflect.construct的写法
const instance = Reflect.construct(Greeting, ['张三'])


//Reflect.getPrototypeOf(obj)用于读取对象的__proto__属性，对应
//Object.getPrototypeOf(obj)

const myObject = new FancyThing();

console.log(Object.getPrototypeOf(myObject) === FancyThing.prototype);

console.log(Reflect.getPrototypeOf(myObject) === FancyThing.prototype)






const queuedObservers = new Set();

const observe = fn => queuedObservers.add(fn);
const observable = obj => new Proxy(obj, {set})

function set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver);
    queuedObservers.forEach(observer => observer());
    return result;
}
const person = observable({
    name: '张三',
    age: 20
});

function print() {
    console.log(`${person.name}, ${person.age}`)
}

observe(print);
person.name = '李四';


