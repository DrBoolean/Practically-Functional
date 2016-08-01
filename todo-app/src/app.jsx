const React = require('react')
const Task = require('data.task')
const list = require('./todolist')
const classNames = require('classnames')
const { pluralize } = require('./utils')

const TodoItem = React.createClass({
  getInitialState() {
    return {editing: false}
  },

  handleEdit() {
    this.refs.editField.value = this.props.todo.name
    this.setState({editing: true})
  },

  stopEditOnEsc(e) {
    if (e.key === 'Escape') return this.setState({editing: false})
    if (e.key === 'Enter') {
      this.props.onEdit(this.props.todo, this.refs.editField.value)
      this.setState({editing: false})
    }
  },

  render() {
    return (
      <li className={classNames({
        completed: this.props.todo.completed_at,
        editing: this.state.editing
      })}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={this.props.todo.completed_at}
          onChange={() => this.props.onToggle(this.props.todo)}
        />
        <label onDoubleClick={this.handleEdit}>
          {this.props.todo.name}
        </label>
        <button className="destroy" onClick={() => this.props.onDestroy(this.props.todo)} />
      </div>
      <input
        ref="editField"
        className="edit"
        onKeyDown={this.stopEditOnEsc}
      />
    </li>
    )
  }
})

module.exports = React.createClass({
  displayName: 'App',

  getInitialState() {
    return {error: "", todos: [], filter: 'all' }
  },

  componentWillMount() {
    list.getTodos()
    .fork(alert, ts => this.setState({todos: ts}))
  },

  showError(s) {
    this.setState({error: s})
  },

  edit(todo, name) {
    list.update(todo, name, this.state.todos)
    .fork(alert, ts => this.setState({todos: ts}))
  },

  destroy(todo) {
    list.destroy(todo, this.state.todos)
    .fork(alert, ts => this.setState({todos: ts}))
  },

  toggle(todo) {
    list.toggle(todo, this.state.todos)
    .fork(alert, ts => this.setState({todos: ts}))
  },

  toggleAll() {
    list.toggleAll(this.state.todos)
    .fork(alert, ts => this.setState({todos: ts}))
  },

  save(input) {
    list.save(input.value, this.state.todos)
    .fork(alert, ts => {
      input.value = ""
      this.setState({todos: ts})
    })
  },

  saveOnEnter(e) {
    if (e.key === "Enter") this.save(e.currentTarget)
  },

  setFilter(x) {
    this.setState({filter: x})
  },

  clearCompleted() {
    list.clearCompleted(this.state.todos)
    .fork(alert, ts => this.setState({todos: ts}))
  },

  incompleteCount() {
    return list.incomplete(this.state.todos).length
  },

  renderMain() {
    const todos = list[this.state.filter](this.state.todos)

    return (
      <section className="main">
        <input
          className="toggle-all"
          type="checkbox"
          onChange={this.toggleAll}
          checked={this.incompleteCount() === 0}
        />
        <ul className="todo-list">
          {todos.map(t =>
            <TodoItem
              key={t.name}
              todo={t}
              onEdit={this.edit}
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
        {this.state.todos.length ? this.renderMain() : null}
        {this.renderFooter()}
      </div>
    )
  }
})


