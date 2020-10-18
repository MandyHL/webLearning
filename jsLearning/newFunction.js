/*
 * @Author: your name
 * @Date: 2020-10-18 17:36:47
 * @LastEditTime: 2020-10-18 17:50:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webLearning\jsLearning\newFunction.js
 */
// new 的实现
function create() {
    // 1.创建一个全新的对象
    let obj = new Object();

    //2.获取构造函数
    let Con = [].shift.call(arguments);//拿到第一个元素

    // 3.将对象的__proto__连接到构造函数的prototype
    obj.__proto__ = Con.prototype;

    // 4.绑定this, 以及参数;
    let result = Con.apply(obj,arguments)
    
    //确保返回的是对象
    return typeof result === 'object' ? result : obj;
}