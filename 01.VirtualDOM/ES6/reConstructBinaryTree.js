function reConstructBinaryTree(pre, vin) {
    var result = null;
    if (pre.length === 1) {
        result = {
            val: pre[0],
            left: null,
            right: null
        }
    } else if (pre.length > 1) {
        var root = pre[0]; //先序遍历的第一个节点是根节点
        var vinRootIndex = vin.indexOf(root); //找出根节点在中序中的位置
        var vinLeft = vin.slice(0, vinRootIndex);//以根节点来划分左子树和右子树
        var vinRight = vin.slice(vinRootIndex + 1, vin.length)
        pre.shift(); //删除第一个元素，即根节点
        var preLeft = pre.slice(0, vinLeft.length)
        var preRight = pre.slice(vinLeft.length, pre.length)
        result = {
            val: root,
            left: reConstructBinaryTree(pre.left, vinLeft),
            right: reConstructBinaryTree(pre.right, vinRight)
        }
    }
    return result
}

//前序遍历
function prevTraverse(node){
    if(node === null) return;
    console.log(node.data)
    prevTraverse(node.left)
    prevTraverse(node.right)
}

//中序遍历
function middleTraverse(node){
    if(node === null) return;
    middleTraverse(node.left);
    console.log(node.data);
    middleTraverse(node.right)
}


//后序遍历
function lastTraverse(node){
    if(node === null) return;
    lastTraverse(node.left);
    lastTraverse(node.right);
    console.log(node.data);
}


//广度优先-层次遍历
var result = []
var stack = [tree]
var count = 0
var bfs = function (){
    var node = stack[count];
    if(node){
        result.push(node.value);
        if(node.left) stack.push(node.left)
        if(node.right) stack.push(node.right)
        count ++
        bfs()
    }
}

bfs()
console.log(result)