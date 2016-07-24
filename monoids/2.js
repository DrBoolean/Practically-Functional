const { List } = require('immutable-ext')
const notNull = x => x
const allDigits = x => x.match(/^\d+$/ig)
const hasLength = n => x => x.length >= n
const isEmail = x => x.match(/@/ig)

