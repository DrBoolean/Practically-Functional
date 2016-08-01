const Task = require('data.task')
const Either = require('data.either')
const {Right, Left, fromNullable} = Either
const {find, copyArray} = require('./utils')
const {toggleCompletedAt, sanitizeName, Todo} = require('./todo')
const {getItem, setItem} = require('./localstorage')
const {validateUnique, validateNotEmpty} = require('./validations')

const getTodos = () =>
  getItem('todos')
  .map(e => e.chain(Either.try(JSON.parse)))
  .map(x => x.getOrElse([]))

const setTodos = todos =>
  Task.of(JSON.stringify(todos))
  .chain(str => setItem('todos', str))
  .map(() => todos)

const findTodo = (todos, todo) =>
  find(todos, t => t.name === todo.name)

const save = (name, todos) =>
  validateNotEmpty(name)
  .map(sanitizeName)
  .map(t => Todo(t))
  .chain(t =>
    validateUnique(findTodo, todos, t))
  .map(todo => todos.concat(todo))
  .fold(e => Task.rejected(e),
        ts => setTodos(ts))

const update = (todo, name, todos) =>
  validateNotEmpty(name)
  .map(sanitizeName)
  .chain(() =>
    findTodo(todos, todo)
    .map(t => Object.assign(t, {name})))
  .fold(e => Task.rejected(e),
        () => setTodos(todos))

const toggle = (todo, todos) =>
  Task.of(copyArray(todos))
  .chain(ts =>
    findTodo(ts, todo)
    .map(t => toggleCompletedAt(t))
    .fold(e => Task.rejected(e),
          () => setTodos(ts)))

const toggleAll = todos =>
  Task.of(copyArray(todos))
  .map(ts =>
    ts.map(t => toggleCompletedAt(t)))
  .chain(ts => setTodos(ts))

const destroy = (todo, todos) =>
  Task.of(copyArray(todos))
  .chain(ts =>
    findTodo(ts, todo)
    .map(i => ts.indexOf(i))
    .map(i => ts.splice(i,1))
    .fold(e => Task.rejected(e),
          () => setTodos(ts)))

const newestFirst = todos =>
  todos.sort((a, b) =>
    Number(a.created_at < b.created_at))

const all = newestFirst

const clearCompleted = todos =>
  setTodos(incomplete(todos))

const complete = todos =>
  newestFirst(todos).filter(t => t.completed_at)

const incomplete = todos =>
  newestFirst(todos).filter(t => !t.completed_at)

module.exports = {
  save,
  update,
  destroy,
  toggle,
  toggleAll,
  complete,
  all,
  incomplete,
  clearCompleted,
  getTodos
}

