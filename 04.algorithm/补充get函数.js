
// 请实现get函数：
//function get() { 
// 请补全函数参数和实现逻辑
//} 

const obj = {  
    selector: { to: { toutiao: 'FE coder' } },
    target: [1, 2, { name: 'byted' }]
 };

// 运行代码 get(obj, 'selector.to.toutiao', 'target[0]', 'target[2].name') 
// 输出结果： 
// ['FE coder', 1, 'byted']
//（不能使用with和eval）