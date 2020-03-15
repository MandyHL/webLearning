虚拟DOM 用javaScript对象来表示VNode,VNode的解构如下：
VNode ={
    vtype:VType,
    type：string,
    props:props,
    children:Virtual Children,
    key:string|number|undefined,
    ref:Function|string|null,
    dom:Element|null,
    _owner:Component,
    parentContext:Context

}