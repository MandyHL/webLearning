if(!Function.prototype.bind){
    Function.prototype.bind = function(...args){
        let self = this;//保留原函数
        let context = args.shift();//取出第一个参数作为上下文
        if(!context){
            throw new Error('No this Object')
        }
        return function(...rest){
            self.apply(context,[...args,...rest])
        }
    }
}