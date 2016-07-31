const {List} = require('immutable-ext')
const sum = [1,2,3].reduce((acc, x) => acc + x, 0)
const product = [1,2,3].reduce((acc, x) => acc * x, 1)
const any = [true, false].reduce((acc, x) => acc || x, false)
const all = [true, false].reduce((acc, x) => acc && x, true)
const max = [1,2,3].reduce((acc, x) => acc > x ? acc : x, -Infinity)

const Sum = x =>
({
  x,
  concat: other => Sum(other.x + x),
  inspect: () => `Sum(${x})`
})

Sum.empty = () => Sum(0)

const Product = x =>
({
  x,
  concat: other => Product(other.x * x),
  inspect: () => `Product(${x})`
})

Product.empty = () => Product(1)

const Any = x =>
({
  x,
  concat: other => Any(other.x || x),
  inspect: () => `Any(${x})`
})

Any.empty = () => Any(false)
const res = List.of(1,2,3,4).foldMap(Sum, Sum.empty())
console.log(res)


