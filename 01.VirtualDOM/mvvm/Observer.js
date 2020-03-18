// 数据监听器

//对对象的属性进行拦截
function defineReactive(data,key,val){ //(对象，属性名，属性描述符)
    observe(val);//递归遍历所有子属性
    var dep = new Dep();//初始化消息订阅者
    Object.defineProperty(data,key,{
        configurable:true,
        enumerable:true,
        get:function(){
            return val;
            if(Dep.target){
                dep.addSub(Dep.target)//在这里添加一个订阅者
            }
        },
        set:function(newVal){
            val = newVal;
            console.log(`属性${key}已经被监听了，现在的值为：${newVal.toString()}`);
            dep.notify();//如果数据变化，通知所有的订阅者
        }
    })
}

//遍历对象的属性
function observe(data){
    if(!data || typeof data != 'object'){
        return ;
    }
    //Object.keys()返回对象自身可枚举属性的树组
    Object.keys(data).forEach(function(key){
        defineReactive(data,key,data[key])
    })
}

// var library = {
//     book1:{
//         book1name:''
//     },
//     book2:''
// }

// observe(library)
// library.book1.book1name='vue权威指南';
// library.book2 = '没有数据'



//消息订阅器 （收集订阅者，属性变化时执行对应订阅者的更新函数）
function Dep(){
    this.subs = [];//订阅者的数组
    this.target = null;//每次要加入数组的订阅者
}
Dep.prototype = {
    addSub:function(sub){
        this.subs.push(sub)
    },
    notify:function(){
        this.subs.forEach(item=>{
            item.update()
        })
    }
}
