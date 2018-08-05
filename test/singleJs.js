const torrentJs = require('../loadjs-torrent')
const test = require('tape-promise/tape')
const magnetLinks = require('./shared/magnetLinks.js')
const destroyClient = require('./shared/destroyClientPromise.js')
const WebTorrent = require('webtorrent')

test('Single Js file should be correctly loaded', async (t) => {
  const client = new WebTorrent()

  delete window.test

  await torrentJs(magnetLinks.windowString, {client: client})
  t.equals(window.test, 'torrent load success')
  await destroyClient(client)
})
