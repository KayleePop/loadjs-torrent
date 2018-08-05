const torrentJs = require('../loadjs-torrent')
const test = require('tape-promise/tape')
const magnetLinks = require('./shared/magnetLinks.js')

test('Error callback should be called on invalid path', async (t) => {
  delete window.string

  try {
    await torrentJs(magnetLinks.pathTest, {path: '/invalid'})
    t.fail('error should be caught')
  } catch (err) {
    t.equals(err.message, 'no JS or CSS files found matching this glob: /invalid')
  }
})
