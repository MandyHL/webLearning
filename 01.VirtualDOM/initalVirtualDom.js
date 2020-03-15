const tree = Element('div',{id:'virtual-container'},[
    Element('p',{},['Virtual DOM']),
    Element('div',{},['before update']),
    Element('ul',{},[
        Element('li',{class:'item'},['item 1']),
        Element('li',{class:'item'},['item 2']),
        Element('li',{class:'item'},['item 3'])
    ])
])
const root = tree.render();
document.getElementById('virtualDom').appendChild(root);