const torrentJs = require('../loadjs-torrent')
const test = require('tape')
const magnetLinks = require('./shared/magnetLinks.js')

test('Single Js file should be correctly loaded', (t) => {
  t.plan(1)

  delete window.test

  torrentJs(magnetLinks.windowString)
    .then(() => t.equals(window.test, 'torrent load success'))
    .catch((err) => t.fail(err.message))
})
