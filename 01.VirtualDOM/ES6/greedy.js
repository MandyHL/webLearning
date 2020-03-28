var items = ['A', 'B', 'C', 'D']
var values = [50, 220, 60, 60]
var weights = [5, 20, 10, 12]
var capacity = 32 //背包容积

greedy(values, weights, capacity)

function greedy(values, weights, capacity) {
    var result = 0
    var rest = capacity;
    var num = 0
    var sortArr = [];
    values.forEach((item, index) => {
        sortArr.push({
            value: item,
            weight: weights[index],
            ratio: item / weights[index]
        })
    })
    sortArr.sort((a, b) => {
        return b.ratio - a.ratio //降序排列
    })

    sortArr.forEach((item, index) => {
        num = parseInt(rest / item.weight)
        rest -= num * item.weight
        result += num * item.value
    })
    console.log(result)
    return result

}