const torrentJs = require('../loadjs-torrent')
const test = require('tape')
const magnetLinks = require('./shared/magnetLinks.js')

test('Error callback should be called on invalid path', (t) => {
  t.plan(1)

  delete window.string

  torrentJs(magnetLinks.pathTest, {path: '/invalid'})
    .then(() => t.fail('error should be caught'))
    .catch((err) => t.equals(err.message, 'no JS or CSS files found matching this glob: /invalid'))
})
