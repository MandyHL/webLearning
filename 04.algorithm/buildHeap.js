//创建堆
function buildHeap(arr) {
    //从最后一个非叶子节点开始，依次做下沉调整
    for (let i = (arr.length - 2) / 2; i >= 0; i--) {
        downAdjust(arr,i,arr.length)
    }
    console.log(arr)
}

//下沉调整 
function downAdjust(arr,parentIndex,length){
    //temp保存父节点值，用于最后的赋值
    let temp = arr[parentIndex];
    let childIndex = 2 * parentIndex + 1;//左孩子节点坐标

    while(childIndex < length){
        debugger
        //如果有有孩子，且右孩子小于左孩子的值，定位到有节点
        if(childIndex + 1 < length && arr[childIndex + 1] < arr[childIndex]){
            childIndex ++;
        }
        //如果父节点小于任何一个孩子节点的值，则直接退出
        if(temp < arr[childIndex]){
            break;
        }else{
            arr[parentIndex] = arr[childIndex];//子节点的值上移值父节点

            parentIndex = childIndex; //继续往下做判断
            childIndex = 2 * childIndex + 1
        }
    }

    arr[parentIndex] = temp
}

//上浮调整
function upAdjust(arr){
    let childIndex = arr.length - 1;
    let parentIndex = Math.ceil((childIndex - 1) / 2);

    //temp保存插入的节点的值，用于最后的赋值
    let temp = arr[childIndex];
    while(childIndex > 0 && temp < arr[parentIndex]){
        debugger
        console.log('孩子节点',childIndex , arr[childIndex])
        console.log('父节点',parentIndex , arr[parentIndex])
        arr[childIndex] = arr[parentIndex];
        childIndex = parentIndex;
        parentIndex = Math.ceil((parentIndex - 1) / 2 )//往爷爷节点做比较
    }

    arr[childIndex] = temp;
    console.log(arr)
}


upAdjust([1,3,2,6,5,7,8,9,10,0])
