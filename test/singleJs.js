const torrentJs = require('../loadjs-torrent')
const test = require('tape-promise/tape')
const magnetLinks = require('./shared/magnetLinks.js')

test('Single Js file should be correctly loaded', async (t) => {
  delete window.test

  await torrentJs(magnetLinks.windowString)
  t.equals(window.test, 'torrent load success')
})
