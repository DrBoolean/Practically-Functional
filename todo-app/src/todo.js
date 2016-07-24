class Todo {

  constructor(attrs) {
    this.name = this.sanitizeName(attrs.name)
    this.created_at = attrs.created_at || new Date()
    this.completed_at = attrs.completed_at
  }

  sanitizeName(name) {
    if (name) return name.replace(/[<>]/g, '')
  }

  toggleComplete() {
    if (!this.completed_at) {
      this.completed_at = new Date()
    } else {
      this.completed_at = null
    }
  }

}

module.exports = Todo
