const torrentJs = require('../loadjs-torrent')
const test = require('tape-promise/tape')
const WebTorrent = require('webtorrent')
const magnetLinks = require('./shared/magnetLinks.js')

test('only the one file specified by path option is loaded', async (t) => {
  delete window.string

  await torrentJs(magnetLinks.pathTest, {path: 'string.js'})
  t.equals(window.string, 'string loaded')
})

test('globstar correctly loads entire folder', async (t) => {
  delete window.string

  await torrentJs(magnetLinks.pathTest, {path: 'folder/**'})
  t.equals(window.string, 'undefinedloadedloaded')
})

test('using the same client with opts.client loads files correctly', async (t) => {
  let client = new WebTorrent()

  delete window.string

  await torrentJs(magnetLinks.pathTest, {path: 'string.js', client: client})
  t.equals(window.string, 'string loaded')

  delete window.string

  await torrentJs(magnetLinks.pathTest, {path: 'other.js', client: client})
  t.equals(window.string, 'wrong file loaded')
})

test('using an initial slash should still load the file correctly', async (t) => {
  delete window.string

  await torrentJs(magnetLinks.pathTest, {path: '/string.js'})
  t.equals(window.string, 'string loaded')
})
