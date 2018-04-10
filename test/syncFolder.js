const torrentJs = require('../loadjs-torrent')
const test = require('tape')
const magnetLinks = require('./shared/magnetLinks.js')

test('folders loaded with async:false should load in order', (t) => {
  t.plan(1)

  delete window.string

  torrentJs(magnetLinks.syncTest, {async: false})
    .then(() => t.equals(window.string, 'first file loaded, and the second too'))
    .catch((err) => t.fail(err.message))
})
