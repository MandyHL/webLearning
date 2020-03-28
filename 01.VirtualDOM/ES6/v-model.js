var obj = {}
var name

Object.defineProperty(obj, 'data', {
    //获取值
    get: function () {
        return name
    },

    set: function (val) {
        name = val;
        console.log(val)
    }
})

//赋值调用ser
obj.data = 'data';

//取值调用get
console.log(obj.data);


//详细版
myVue.prototype._obverse = function (obj) {
    var value;
    for (key in obj) { //遍历obj对象
        if (obj.hasOwnProperty(key)) { //是对象本身的属性
            value = obj[key];
            if (typeof value === 'object') { //如果值是对象，则递归处理
                this._obverse(value)
            }
            Object.defineProperty(this.$data, key, {
                enumerable: true,
                configurable: true,
                get: function () {
                    console.log(`获取${value}`);
                    return value;
                },
                set: function (newVal) {
                    console.log(`更新${newVal}`);
                    if (value !== newVal) {
                        Value = newVal
                    }
                }
            })
        }
    }
}


//如果data是个对象，那么整个vue实例将共享一份数据，也就是各个组件实例可以随意修改其他组件的任意值
//data是个函数，将会return 出一个唯一的对象，不会和其他组件共享一个对象