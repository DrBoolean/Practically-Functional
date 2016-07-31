const Right = x =>
({
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`
})

const Left = x =>
({
  chain: f => Left(x),
  map: f => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`
})

const fromNullable = x =>
  x != null ? Right(x) : Left(null)

const tryCatch = f => {
  try {
    return Right(f())
  } catch(e) {
    return Left(e)
  }
}
//=====================================


const fs = require('fs')

const getPort = () =>
  tryCatch(() => fs.readFileSync('config.json')) // Right(str)
  .chain(str => tryCatch(() => JSON.parse(str))) // Right({})
  .fold(e => 3000,
        config => config.port)

const result = getPort()

console.log(result)
