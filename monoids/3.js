const {List, Map} = require('immutable-ext')

const Max = x =>
({
  x,
  concat: ({x: y}) => Max(x > y ? x : y),
  inspect: () => `Max(${x})`
})

const Sum = x =>
({
  x,
  concat: ({x: y}) => Sum(y + x),
  inspect: () => `Sum(${x})`
})

const Const = x =>
({
  x,
  concat: o => Const(x),
  inspect: () => `Const(${x})`
})

const m = Map({ name: 'brian', age: 30, money: 10, friends: ['Franklin'] })
const n = Map({ name: 'brian', age: 29, money: 3, friends: ['Gatsby'] })
// const res = m.concat(n)
// console.log(res.toJS())


