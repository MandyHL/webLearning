const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing().then(function() {
  console.log('everything is great');
});


//用promise.resolve()将现有对象转为Promise对象
const jsPromise = Promise.resolve()

//立即resolve()的Promise对象，是在本轮事件循环结束时执行，而不是在下一轮事件循环开始时