function defineReactive(data,key ,val){
        observe(val);//递归遍历所有子属性
        var dep= new Dep();
        Object.defineProperty(data,key,{
            enumerable:true,
            configurable:true,
            get:function(){
                if(Dep.target){
                    dep.addSub(Dep.target);//在这里增加一个订阅者
                }
                return val;
            },
            set:function(newVal){
                if(val === newVal){
                    return;
                }
                val = newVal;
                console.log(`属性${key}现在已经被监听了，现在的值为${newVal.toString()}`);
                dep.notify();//如果数据变化，通知所有的订阅者
            }
        })
}
Dep.target = null;

function observe(data){
    if(!data || typeof data !=='object'){
        console.log(`当前的数据不是一个对象:${JSON.stringify(data)}`)
        return;
    }
    Object.keys(data).forEach(function(key){
        defineReactive(data,key,data[key])
    })
}

function Dep(){ //消息订阅器，负责收集订阅者
    this.subs=[];
}
Dep.prototype={
    addSub:function(sub){
        this.subs.push(sub);
    },
    notify:function(){
        this.subs.forEach(function(sub){
            sub.update();
        })
    }
}

var library ={
    book1:{
        name:''
    },
    book2:'',
    name:'你哈'
}
observe(library);
library.book1.name = 'vue权威指南';
library.book2 = '没有此数据'
library.name = '似曾相似燕归来'