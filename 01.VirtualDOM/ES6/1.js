var items = ['A','B','C','D']
var values = [50,220,60,60]
var weights = [5,20,10,12]
var capacity = 32 //背包容积

greedy(values, weights, capacity) // 320

function greedy(values, weights, capacity) {
        var result = 0
        var rest = capacity
        var sortArray = []
        var num = 0
        values.forEach((v, i) => {
          sortArray.push({
            value: v,
            weight: weights[i],
            ratio: v / weights[i]
          })
        })
        sortArray.sort((a, b) => b.ratio - a.ratio)
        sortArray.forEach((v, i) => {
          num = parseInt(rest / v.weight)
          rest -= num * v.weight
          result += num * v.value
        })
        console.log(result)
        return result
      }