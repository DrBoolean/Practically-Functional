const Right = x =>
({
  fold: (f, g) => g(x),
  map: f => Right(f(x)),
  inspect: () => `Right(${x})`
})

const Left = x =>
({
  fold: (f, g) => f(x),
  map: f => Left(x),
  inspect: () => `Left(${x})`
})

const fromNullable = x =>
  x != null ? Right(x) : Left(null)

const findColor = name =>
  ({red: '#ff4444', blue: '#3b5998', yellow: '#fff68f'}[name])

const res = fromNullable(findColor('red'))
            .map(x => x.slice(1))
            .fold(e => 'no color',
                  c => c.toUpperCase())

console.log(res)
