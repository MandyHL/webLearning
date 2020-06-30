const PENDING = Symbol('PENDING'); //等待
const RESOLVED = Symbol('RESOLVED'); //成功
const REJECTED = Symbol('REJECTED'); //失败

const resolvePromise = (promise2, x, resolve, reject) => {
    //判断x的值 x和promise不能是同一个人
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise'))
    }
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        //防止多次调用成功或失败
        let called;//内部测试时，会成功和失败都调用
        try {
            let then = x.then;
            if (typeof then === 'function') {//当前有then方法 姑且认为这是一个promise
                then.call(x, y => { //y可能还是一个promise,直到解析出来的结果是一个普通值为止
                    if (called) {
                        return
                    }
                    called = true;//防止多次调用成功和失败
                    resolvePromise(promise2, y, resolve, reject);//y可能还是一个promise，直到解析出来的结果是一个普通值为止
                }, r => {
                    if (called) {
                        return   //确保只能调用一次
                    }
                    called = true;//防止多次调用
                    reject(r);//采用失败的结果向下传递

                });//能保证不用再次取then的值
            } else {  //别人的promise可能失败了还能调用成功

                //{then:1} 
                resolve(x); //说明x是一个普通对象，直接成功即可
            }
        } catch (e) {
            if (called) {
                return   //确保只能调用一次
            }
            called = true;//防止多次调用
            reject(e);
        }
    } else {
        //x是一个普通值
        resolve(x);//直接让promise2成功即可
    }
}
class Promise {
    //看这个属性能否在原型上使用
    //看属性是否公用
    constructor(executor) {
        this.status = PENDING // 默认是pending状态

        this.value = undefined; //成功的值
        this.reason = undefined; //失败的原因

        this.onResolvedCallbacks = [];//成功回调的数组
        this.onRejectedCallbacks = [];//失败回调的数组

        //成功函数
        let resolve = (value) => {
            if (this.status === PENDING) {
                this.value = value;
                this.status = RESOLVED;
                this.onResolvedCallbacks.forEach(fn => fn()); //发布
            }
        }

        //失败函数
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason;
                this.status = REJECTED;
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }

        try {
            executor(resolve, reject); //默认执行器会立即执行
        } catch (e) {
            reject(e);//如果执行时发生错误 等价于调用了
        }
    }
    then(onfulfilled, onrejected) { //then 目前有两个参数 then方法就是异步的
        //onfulfilled, onrejected 是可选参数

        onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : val => val
        onrejected = typeof onrejected === 'function' ? onrejected : err => {
            throw err
        }
        let promise2 = new Promise((resolve, reject) => { //executor 会立即执行
            if (this.status === RESOLVED) {
                setTimeout(() => {   //目的：等promise new 完成
                    try {
                        const x = onfulfilled(this.value);
                        //x 是普通值，也可能是promise

                        //判断x 的值 =》 promise2的状态
                        resolvePromise(promise2, x, resolve, reject);//解析promise
                    } catch (e) {
                        reject(e);
                    }
                }, 0)
                return
            }
            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        const x = onrejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);//解析promise
                    } catch (e) {
                        reject(e);
                    }
                }, 0)

            }
            if (this.status === PENDING) {
                //如果是异步就先订阅好
                this.onResolvedCallbacks.push(() => { //重写push方法的时候
                    setTimeout(() => {
                        try {
                            const x = onfulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject);//解析promise
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)

                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onrejected(this.reason)
                            resolvePromise(promise2, x, resolve, reject);//解析promise
                        } catch (e) {
                            reject(e);
                        }
                    }, 0)
                })
            }
        })
        return promise2
    }
}

//延迟对象
Promise.defer = Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd
}

module.exports = Promise