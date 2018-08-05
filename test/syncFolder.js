const torrentJs = require('../loadjs-torrent')
const test = require('tape-promise/tape')
const magnetLinks = require('./shared/magnetLinks.js')

test('folders loaded with async:false should load in order', async (t) => {
  delete window.string

  await torrentJs(magnetLinks.syncTest, {async: false})
  t.equals(window.string, 'first file loaded, and the second too')
})
