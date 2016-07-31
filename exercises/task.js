const {assert} = require('chai')
const Task = require('data.task')

describe("Task Exercises", () => {

  // SETUP
  // =========================
  const posts = {1: {title: "First"}, 2: {title: "Second"}}

  const comments = {First: [{id: 1, body: "Brilliant!"}], Second: [{id: 2, body: "Unforgivable"}]}

  const getPost = id =>
    new Task((rej, res) =>
      setTimeout(() => posts[id] ? res(posts[id]) : rej('not found'), 200))

  const getComments = post =>
    new Task((rej, res) =>
      setTimeout(() => res(comments[post.title]), 200))



  // Exercise: Task
  // Goal: Refactor each example using Task
  // Bonus points: no curly braces







  // Ex1: Return the uppercased title of the post
  // =========================
  const postTitle = id =>
    getPost(id) // Task(post)
    .map(p => p.title)
    .map(t => t.toUpperCase())


  it("Ex1: postTitle", (done) => {
    postTitle(1)
    .fork(console.error, t => {
      assert.deepEqual(t, 'FIRST')
      done()
    })
  })


  // Ex2: pass in the post to getComments(), defined above, then assign the returned comments to the post
  // =========================
  const commentsForPost = id =>
    getPost(id)
    .chain(p =>
      getComments(p)
      .map(comments => Object.assign({comments}, p)))


  it("Ex2: commentsForPost", (done) => {
    commentsForPost(2)
    .fork(console.error, t => {
      assert.deepEqual(t.title, "Second")
      assert.deepEqual(t.comments, comments["Second"])
      done()
    })
  })


  // Ex3: Wrap __dirname in a Task to make it "pure"
  // =========================
  const getDirname =
    new Task((rej, res) => res(__dirname))


  it("Ex3: getHref", (done) => {
    getDirname
    .fork(console.error, t => {
      assert.match(t, /exercises$/)
      done()
    })
  })
})

