var lengthOfLongestSubstring = function(s) {
    debugger
    let arr = [];
    let max = 0;
    for(let item of s){
        debugger
        if(arr.includes(item)){
            let index = arr.indexOf(item);
            arr.splice(0, index + 1);
        }
        arr.push(item);
        max = max > arr.length ? max : arr.length;
    }
    return max;
};

lengthOfLongestSubstring("abcabcbb")

