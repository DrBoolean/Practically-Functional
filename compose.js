const length = x => x.length
const trim = x => x.trim()
const take3 = x => x.slice(0, 3)
const inc = x => x + 1

const compose = (f, g) => x => f(g(x))
// const compose = function(f, g) {
//   return function(x) {
//     return f(g(x))
//   }
// }

const trimLen = compose(inc, compose(length, trim))

const res = trimLen("   blah")
console.log(res)
