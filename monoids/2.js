const { List } = require('immutable-ext')

const Suc = x =>
({
  x,
  concat: other =>
    other.msg ? other : Suc(x)
})

const Fail = msg =>
({
  msg,
  concat: other =>
    other.msg ? Fail(msg.concat(other.msg)) : Fail(msg)
})

const Validation = (f, msg) =>
({
  f,
  msg,
  run: x =>
    f(x) ? Suc(x) : Fail(msg),
  concat: other =>
    Validation(x => f(x) && other.f(x), other.msg.concat(msg))
})

const notNull = Validation(x => x, ["can't be null"])
const allDigits = Validation(x => x.match(/^\d+$/ig), ["must be digits"])
const hasLength = n => Validation(x => x.length >= n, ['must have length '+n])
const isEmail = Validation(x => x.match(/@/ig), ['must look like email'])

const isPhone = notNull.concat(allDigits)

const email = "234"
const res = List.of(isPhone).foldMap(v => v.run(email), Suc(email))
console.log(res)

