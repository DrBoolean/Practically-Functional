const Todo = name =>
  ({name, completed_at: null, created_at: Date()})

const sanitizeName = name =>
  name.replace(/[<>]/g, '')

const toggleCompletedAt = t =>
  Object.assign(t, {completed_at: t.completed_at ? null : Date()})

module.exports = {
  Todo,
  sanitizeName,
  toggleCompletedAt
}
