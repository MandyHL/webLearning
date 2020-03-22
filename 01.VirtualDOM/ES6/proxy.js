//proxy的写法
var proxy = new Proxy(target,handler);

//proxy:在目标对象之前架设一层拦截，外界对该对象的访问，都必须先通过这层拦截。因此提供了一种机制，可以对外界的访问进行 过滤和改写
var obj = new Proxy({},{
    get:function (target,propKey,receiver){
        console.log(`gettign ${propKey}!`);
        return Reflect.get(target,propKey,receiver);
    },
    set:function (target,propKey,value,receiver){
        console.log(`setting ${propKey}！`);
        return Reflect.set(target,propKey,value,receiver)
    }
})


obj.count = 1

++obj.count


//proxy实例也可以作为其他对象的原型对象
var proxy = new Proxy({},{
    get:function(target,propKey){
        return 35;
    }
    
})

let obj = Object.create(proxy);
console.log(obj.time)


//同一个拦截器函数，可以设置拦截多个操作
var handler ={
    get:function(target,name){
        debugger
        if(name === 'prototype'){
            return Object.prototype;
        }
        return 'Hello,'+name
    },
    apply:function(target,thisBinding,args){//拦截Proxy实例作为函数调用的的作操作
        debugger
        return args[0];
    },
    construct:function(target,args){//拦截Proxy实例作为函数调用的操作
        debugger
        return {value:args[1]}
    }
}

var fproxy =new Proxy(function(x,y){
    return x+y
},handler)

console.log(fproxy(1,2))
console.log(new fproxy(1,2))
console.log(fproxy.__proto__)
console.log(fproxy.name)
console.log(fproxy(8,1,2,5))

//get()方法用于拦截某个属性的读取操作，（目标对象，属性名，proxy实例本身）
var person ={
    name:'张三'
}

var proxy = new Proxy(person,{
    get:function(target,propKey){
        if(propKey in target){
            console.log(target[propKey])
            return target[propKey];
        }else{
            throw new Error(`Prop name ${propKey}does no exist.`)
        }
    }
})

proxy.name;
proxy.age;//如果没有拦截函数，访问不存在的属性，只会返回undefined

// get方法可以继承
let proto = new Proxy({},{
    get(target,propertyKey,receiver){
        debugger
        console.log('GET',+propertyKey);
        return target[propertyKey]
    }
})

let obj = Object.create(proto);
console.log(obj.foo)