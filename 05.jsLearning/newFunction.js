/*
 * @Author: your name
 * @Date: 2020-10-18 17:36:47
 * @LastEditTime: 2020-10-18 17:57:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webLearning\jsLearning\newFunction.js
 */
// new 的实现
function create() {
    // 1.创建一个全新的对象
    let obj = new Object();

    //获取构造函数
    let Con = [].shift.call(arguments);//拿到第一个元素

    // 2.将对象的__proto__指向构造函数的prototype对象
    obj.__proto__ = Con.prototype;

    // 3.绑定this, 以及参数;
    let result = Con.apply(obj,arguments)
    
    //4.确保返回的是对象（如果构造器没有返回其他对象，则自动返回这个新对象）
    return typeof result === 'object' ? result : obj;
}