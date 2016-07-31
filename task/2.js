const Task = require('data.task')
const fs = require('fs')

const readFile = name =>
  new Task((rej, res) =>
    fs.readFile(name, 'utf-8', (err, contents) =>
      err ? rej(err) : res(contents)))

const writeFile = (name, contents) =>
  new Task((rej, res) =>
    fs.writeFile(name, contents, (err, _) =>
      err ? rej(err) : res(contents)))

const app = () =>
  readFile('config.json')
  .map(contents => contents.replace(/8/g, '6')) // Task(repl)
  .chain(replaced => writeFile('config1.json', replaced))

// const app = () =>
//   fs.readFile('config.json', 'utf-8', (err, contents) => {
//     if(err) throw err

//     const newContents = contents.replace(/8/g, '6')

//     fs.writeFile('config1.json', newContents, (err, _) => {
//       if(err) throw err
//       console.log('success!')
//     })
//   })

app().fork(console.error, () => console.log('success!'))
