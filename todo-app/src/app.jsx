const React = require('react')
const Todo = require('./todo')
const Task = require('data.task')
const TodoList = require('./todolist')
const classNames = require('classnames')
const Either = require('data.either')
const { Right, Left, fromNullable } = Either
const { pluralize } = require('./utils')

const TodoItem = ({todo, onDestroy, onToggle}) =>
  <li className={classNames({ completed: todo.completed_at })}>
    <div className="view">
      <input
        className="toggle"
        type="checkbox"
        checked={todo.completed_at}
        onChange={() => onToggle(todo)}
      />
      <label>
        {todo.name}
      </label>
      <button className="destroy" onClick={() => onDestroy(todo)} />
    </div>
  </li>

module.exports = React.createClass({
  displayName: 'App',

  getInitialState() {
    return {error: "", list: new TodoList(), filter: 'all' }
  },

  destroy(todo) {
    this.state.list.destroy(todo, (err, list) => {
      if(err) return alert(err)
      this.setState({list: list})
    })
  },

  toggle(todo) {
    this.state.list.toggle(todo, (err, list) => {
      if(err) return alert(err)
      this.setState({list: list})
    })
  },

  save(input) {
    this.state.list.save(input.value, (err, list) => {
      if(err) return alert(err)
      this.setState({list: list})
      input.value = ""
    })
  },

  saveOnEnter(e) {
    if (e.key === "Enter") this.save(e.currentTarget)
  },

  setFilter(x) {
    this.setState({filter: x})
  },

  clearCompleted() {
    this.state.list.clearCompleted((err, list) => {
      if(err) return alert(err)
      this.setState({list: list})
    })
  },

  incompleteCount() {
    return this.state.list.incomplete().length
  },

  renderMain(list) {
    const todos = list[this.state.filter]()

    return (
      <section className="main">
        <input
          className="toggle-all"
          type="checkbox"
        />
        <ul className="todo-list">
          {todos.map(t =>
            <TodoItem
              key={t.name}
              todo={t}
              onDestroy={this.destroy}
              onToggle={this.toggle} />
            )}
        </ul>
      </section>
    )
  },

  renderFooter() {
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{this.incompleteCount()} </strong>
          {pluralize('todo', this.incompleteCount())} left
        </span>
        <ul className="filters">
          <li>
          <a
            href="#"
            onClick={() => this.setFilter('all')}
            className={classNames({selected: this.state.filter === 'all'})}>
            All
          </a>
          </li>
          {' '}
        <li>
          <a
            href="#incomplete"
            onClick={() => this.setFilter('incomplete')}
            className={classNames({selected: this.state.filter === 'incomplete'})}>
            Active
          </a>
          </li>
          {' '}
        <li>
          <a
            href="#complete"
            onClick={() => this.setFilter('complete')}
            className={classNames({selected: this.state.filter === 'complete'})}>
            Completed
          </a>
        </li>
      </ul>
        <button className="clear-completed" onClick={this.clearCompleted}>
          Clear completed
        </button>
      </footer>
    )
  },

  render() {
    return (
      <div>
        <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onKeyDown={this.saveOnEnter}
          autoFocus={true}
        />
        </header>
        {this.state.list.todos.length ? this.renderMain(this.state.list) : null}
        {this.renderFooter()}
      </div>
    )
  }
})

