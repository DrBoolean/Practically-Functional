const Either = require('../either')

const $ = selector =>
  Either.of({selector, height: 10})

const getScreenSize = (screen, head, foot) =>
  screen - (head.height + foot.height)

