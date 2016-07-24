const { List } = require('immutable-ext')

const res = List.of(x => y => z => [x, y, z].join('-'))
  .ap(List.of('tshirt', 'sweater'))
  .ap(List.of('white', 'black'))
  .ap(List.of('small', 'medium', 'large'))

console.log(res)
