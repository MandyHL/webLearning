
var name ='';
var Book ={
    name:''
};

Object.defineProperty(Book,'name',{
    set:function(value){
        name = value;
        console.log(`你买了一本书，书名叫做${value}`)
    },
    get:function(){
        return `《${name}》`
    }
})
Book.name = '武林外传'

console.log(Book.name);
