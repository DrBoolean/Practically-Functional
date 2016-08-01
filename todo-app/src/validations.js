const {Right, Left} = require('data.either')

const validateNotEmpty = x =>
  x.trim() ? Right(x) : Left('need a name')

const validateUnique = (finder, xs, x) =>
  finder(xs, x)
  .fold(() => Right(x),
        () => Left('found duplicate'))

module.exports = { validateNotEmpty, validateUnique }
