var lengthOfLongestSubstring = function(s) {
   let map = new Map();
   let ans = 0;
   for(let start = end = 0 ;end < s.length ;end++){
       let char = s.charAt(end);
       if(map.has(char)){
            start = Math.max(map.get(char),start)
       }
       ans = Math.max(end - start + 1 ,ans)
       map.set(char,end + 1)
   }
   return ans;
};

lengthOfLongestSubstring("abcabcbb")

