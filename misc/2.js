// Functor
Box.of(20).map(x => x / 2)
// Box(10)

// Monad
Box.of(true).chain(x => Box.of(!x))
// Box(false)

// Monoid
Box.of('small').concat(Box.of('pox'))
// Box('smallpox')
//
// Applicative
Box.of(x => x + 1).ap(Box.of(2))
// Box(3)

// Traversable
Box.of(3).traverse(Either.of, x => fromNullable(x))
// Right(Box(3))

// Natural transformation
eitherToBox(fromNullable(null))
// Box(null)
