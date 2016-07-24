const Task = require('data.task')

const Db = ({
  find: (id, cb) =>
    new Task((rej, res) =>
      setTimeout(() =>
        res({id: id, title: `Project ${id}`}), 100))
})

const reportHeader = (p1, p2) =>
  `Report: ${p1.title} compared to ${p2.title}`

