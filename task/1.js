const Task = require('data.task')

const longCalculation = (x, done) =>
  setTimeout(() => done(x + 1), 2000)
