const Task = require('data.task')

const testUser = {id: 2, name: 'user1'}

const Db = ({
  find: _id =>
    new Task((rej, res) => res(testUser))
})

Db.find(3)
.fork(console.log, console.log)
