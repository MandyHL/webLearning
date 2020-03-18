//订阅者
function Watcher(vm,prop,callback){//prop:data中定义的变量 callback:订阅者要执行的回调函数
    this.vm = vm;
    this.prop = prop;
    this.callback = callback;
    //添加到订阅者列表中
    this.value = this.get();
}

Watcher.prototype = {
    update:function(){
        const oldValue = this.value;
        const newValue = this.vm.$data[this.prop];
        if(newValue !== oldValue){
            console.log('更新',this.prop);
            this.value = newValue;
            this.callback.call(this.vm,newValue)
        }
       
    },
    get:function(){
        Dep.target = this;//储存订阅器
        const calue = this.vm.$data[this.prop];//因为属性被监听这一步会执行监听器里的get方法
        Dep.target = null;
        return this.value;
    }

}