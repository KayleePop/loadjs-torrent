const torrentJs = require('../loadjs-torrent')
const test = require('tape-promise/tape')
const magnetLinks = require('./shared/magnetLinks.js')
const destroyClient = require('./shared/destroyClientPromise.js')
const WebTorrent = require('webtorrent')

test('single css file should be correctly loaded', async (t) => {
  const client = new WebTorrent()

  document.querySelector('body').style = {}

  await torrentJs(magnetLinks.bodyColor, { client: client })
  let color = window.getComputedStyle(document.body).getPropertyValue('background-color')
  t.equals(color, 'rgb(85, 107, 47)')
  await destroyClient(client)
})
