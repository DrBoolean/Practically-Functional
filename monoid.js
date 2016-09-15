const Sum = x =>
({
  x,
  concat: ({x: y}) => Sum(x + y),
  inspect: () => `Sum(${x})`
})

Sum.empty = () => Sum(0)

const Product = x =>
({
  x,
  concat: ({x: y}) => Product(x * y),
  inspect: () => `Product(${x})`
})

Product.empty = () => Product(1)

const Any = x =>
({
  x,
  concat: ({x: y}) => Any(x || y),
  inspect: () => `Any(${x})`
})

Any.empty = () => Any(false)


const All = x =>
({
  x,
  concat: ({x: y}) => All(x && y),
  inspect: () => `All(${x})`
})

All.empty = () => All(true)


const Max = x =>
({
  x,
  concat: ({x: y}) => Max(x > y ? x : y),
  inspect: () => `Max(${x})`
})

Max.empty = () => Max(-Infinity)

const Min = x =>
({
  x,
  concat: ({x: y}) => Min(x < y ? x : y),
  inspect: () => `Min(${x})`
})

Min.empty = () => Min(Infinity)

const Pair = (x, y) =>
({
  x,
  y,
  concat: ({x: x1, y: y1}) =>
    Pair(x.concat(x1), y.concat(y1)),
  inspect: () => `Pair(${x}, ${y})`
})

const Fn = f =>
({
  fold: f,
  concat: o =>
    Fn(x => f(x).concat(o.fold(x))),
  inspect: () => `Fn(${f})`
})

module.exports = {
  Sum,
  Product,
  Max,
  Min,
  Any,
  All,
  Pair,
  Fn
}
