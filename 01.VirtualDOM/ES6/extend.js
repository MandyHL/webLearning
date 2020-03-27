function Father(){}

function Child(){}

// 1.原型继承
Child.prototype = new Father()

// 2.构造继承
function Child(name){
Father.call(this,name)
}

// 3.组合继承、
function Child(name){
    Father.call(this,name)
}
Child.prototype = new Father


// 4.ES6 extends继承\
class Father{

}
class Child extends Father {
    
}