function buildHeap(arr){
    //对最后一个非叶子节点，做下沉
    for(let i = (arr.length - 1 )/2;i >= 0; i--){
        downAdjust(arr,i,arr.length)
    }

}

//下沉调整
function downAdjust(arr,parentIndex,length){
    let childIndex = 2 * parentIndex + 1;//左孩子节点的坐标
    let temp = arr[parentIndex];//存储父节点的值
     while(childIndex < length){
         if(childIndex+ 1 < length && arr[childIndex + 1] < arr[childIndex]){//存在右节点且值比左节点小
             childIndex ++;
         }
         if(temp < arr[childIndex]){//父节点最小，无需调整
             break;
         }else{
             arr[parentIndex] = arr[childIndex];//继续向前做比较
             parentIndex =  childIndex;
             childIndex = 2 * parentIndex +1
         }
     }
     arr[parentIndex
    
    
    
    
    
    
    
    
    
    ] = temp;
}