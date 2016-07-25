const fs = require('fs')
const Task = require('data.task')
const Either = require('../either')
const {Right, Left, fromNullable} = Either
const { List, Map } = require('immutable-ext')

const greaterThan5 = x =>
  x.length > 5 ? Right(x) : Left('not greater than 5')

const looksLikeEmail = x =>
  x.match(/@/ig) ? Right(x) : Left('not an email')

const email = "blahh@yadda.com"
const res = [greaterThan5, looksLikeEmail].map(v => v(email))
console.log(res)

