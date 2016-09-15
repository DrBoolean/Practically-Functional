const { Map } = require("immutable-ext")

const Sum = x =>
({
  x,
  concat: ({x: y}) =>
    Sum(x + y),
  inspect: () =>
    `Sum(${x})`
})

const All = x =>
({
  x,
  concat: ({x: y}) =>
    All(x && y),
  inspect: () =>
    `All(${x})`
})

const First = x =>
({
  x,
  concat: _ =>
    First(x),
  inspect: () =>
    `First(${x})`
})

const acct1 = { name: 'Nico', isPaid: true, points: 10, friends: ['Franklin'] }

const acct2 = { name: 'Nico', isPaid: false, points: 2, friends: ['Gatsby'] }

