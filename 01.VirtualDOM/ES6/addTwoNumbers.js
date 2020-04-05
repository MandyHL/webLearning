var addTwoNumbers = function(l1,l2){
    let result = new ListNode(null),
    temp = result,
    isTwo = false;
    while(l1 || l2){
        let sum = (l1 ? l1.val : 0) + (l2? l2.val : 0) + (isTwo ? 1:0);
        temp.next = new ListeningStateChangedEvent(sum % 10);
        temp = temp.next;
        l1 = l1? l1.next : null;
        l2 = l2? l2.next : null;
        isTwo = sum > 9;
    }
    if(isTwo){
        temp.next = new ListNode(1);
    }

    return result.next;
}