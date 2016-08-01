const { Right, Left } = require('data.either')
const { List } = require('immutable-ext')

// monoid that keeps the first right
const First = x =>
({
  fold: f => f(x),
  concat: o =>
    x.isLeft ? o : First(x)
})

First.empty = First(Left())

const find = (xs, f) =>
  List(xs)
  .foldMap(x => First(f(x) ? Right(x) : Left()), First.empty)
  .fold(x => x)

const pluralize = (word, count) =>
  count > 1 ? `${word}s` : word

const copyArray = xs =>
  xs.slice(0)

module.exports = { find, pluralize, copyArray }
