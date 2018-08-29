const torrentJs = require('../loadjs-torrent')
const test = require('tape-promise/tape')
const WebTorrent = require('webtorrent')
const magnetLinks = require('./shared/magnetLinks.js')
const destroyClient = require('./shared/destroyClientPromise.js')

test('only the one file specified by path option is loaded', async (t) => {
  const client = new WebTorrent()

  delete window.string

  await torrentJs(magnetLinks.pathTest, { client: client, path: 'string.js' })
  t.equals(window.string, 'string loaded')
  await destroyClient(client)
})

test('globstar correctly loads entire folder', async (t) => {
  const client = new WebTorrent()

  delete window.string

  await torrentJs(magnetLinks.pathTest, { client: client, path: 'folder/**' })
  t.equals(window.string, 'undefinedloadedloaded')
  await destroyClient(client)
})

test('using the same client with opts.client loads files correctly', async (t) => {
  const client = new WebTorrent()

  delete window.string

  await torrentJs(magnetLinks.pathTest, { path: 'string.js', client: client })
  t.equals(window.string, 'string loaded')

  delete window.string

  await torrentJs(magnetLinks.pathTest, { path: 'other.js', client: client })
  t.equals(window.string, 'wrong file loaded')
  await destroyClient(client)
})

test('using an initial slash should still load the file correctly', async (t) => {
  const client = new WebTorrent()

  delete window.string

  await torrentJs(magnetLinks.pathTest, { client: client, path: '/string.js' })
  t.equals(window.string, 'string loaded')
  await destroyClient(client)
})
