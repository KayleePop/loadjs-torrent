const torrentJs = require('../loadjs-torrent')
const test = require('tape-promise/tape')
const magnetLinks = require('./shared/magnetLinks.js')
const destroyClient = require('./shared/destroyClientPromise.js')
const WebTorrent = require('webtorrent')

test('folders loaded with async:false should load in order', async (t) => {
  const client = new WebTorrent()

  delete window.string

  await torrentJs(magnetLinks.syncTest, {client: client, async: false})
  t.equals(window.string, 'first file loaded, and the second too')
  await destroyClient(client)
})
