Box.of(1).map(x => x + 1)
// Box(2)

Either.of(1).map(x => x + 1)
// Right(2)

Task.of(1).map(x => x + 1)
// Task(2)

List.of(1).map(x => x + 1)
// List(2)

Box.of(1).chain(x => Box(x + 1))
// Box(2)

Either.of(1).chain(x => Either.of(x + 1))
// Right(2)

Task.of(1).chain(x => Task.of(x + 1))
// Task(2)

List.of(1).chain(x => List.of(x + 1))
// List(2)


