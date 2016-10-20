const { Right, fromNullable } = require('../either')
const { List } = require('immutable-ext')

const Sum = x =>
({
  x,
  concat: ({x: y}) => Sum(x + y)
})

const stats = List.of({page: 'Home', views: 40},
                      {page: 'About', views: 10},
                      {page: 'Blog', views: null})

stats.foldMap(x =>
  fromNullable(x.views).map(Sum), Right(Sum(0)))
// Right(Sum(54))


