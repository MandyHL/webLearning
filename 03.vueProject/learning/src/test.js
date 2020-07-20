function fibonacci(n) {
    let current = 0; 
    let next = 1; 
    let temp; 
    for (let i = 0; i < n; i++) {
        temp = current;
        current = next;
        next += temp;
    } 
    console.log(`fibonacci(${n}, ${next}, ${current + next})`); 
    return current;
}

function fibonacci(n){
    let current =0;
    let next=1;
    let temp;
    for(let i = 0;i<n;i++){
        temp = current;
        current = next;
        next += temp;
    }
    console.log(n)
    return next;

}
fibonacci(0)

function fib(n){
    let [a,b] =[1,0]
    while(n--){
        [a,b] = [a+b,a]
    }
    return b
}

console.log(fib(0))