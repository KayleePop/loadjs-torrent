const torrentJs = require('../loadjs-torrent')
const test = require('tape-promise/tape')
const magnetLinks = require('./shared/magnetLinks.js')
const destroyClient = require('./shared/destroyClientPromise.js')
const WebTorrent = require('webtorrent')

test('Error callback should be called on invalid path', async (t) => {
  const client = new WebTorrent()

  delete window.string

  try {
    await torrentJs(magnetLinks.pathTest, { client: client, path: '/invalid' })
    t.fail('error should be caught')
  } catch (err) {
    t.equals(err.message, 'no JS or CSS files found matching this glob: /invalid')
  }
  await destroyClient(client)
})
