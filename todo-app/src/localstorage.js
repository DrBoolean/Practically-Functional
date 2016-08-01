const Task = require('data.task')
const {fromNullable} = require('data.either')

const setItem = (k, v) =>
  new Task((rej, res) =>
    res(localStorage.setItem(k, v)))

const getItem = k =>
  new Task((rej, res) =>
    res(fromNullable(localStorage.getItem(k))))

module.exports = {setItem, getItem}
