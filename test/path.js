const torrentJs = require('../loadjs-torrent')
const test = require('tape')
const WebTorrent = require('webtorrent')
const magnetLinks = require('./shared/magnetLinks.js')

test('only the one file specified by path option is loaded', (t) => {
  t.plan(1)

  delete window.string

  torrentJs(magnetLinks.pathTest, {path: 'string.js'})
    .then(() => t.equals(window.string, 'string loaded'))
    .catch((err) => t.fail(err.message))
})

test('globstar correctly loads entire folder', (t) => {
  t.plan(1)

  delete window.string

  torrentJs(magnetLinks.pathTest, {path: 'folder/**'})
    .then(() => t.equals(window.string, 'undefinedloadedloaded'))
    .catch((err) => t.fail(err.message))
})

test('using the same client with opts.client loads files correctly', (t) => {
  t.plan(2)

  let client = new WebTorrent()

  delete window.string

  torrentJs(magnetLinks.pathTest, {path: 'string.js', client: client})
    .then(() => {
      t.equals(window.string, 'string loaded')

      delete window.string
      return torrentJs(magnetLinks.pathTest, {path: 'other.js', client: client})
    })
    .then(() => t.equals(window.string, 'wrong file loaded'))
    .catch((err) => t.fail(err.message))
})

test('using an initial slash should still load the file correctly', (t) => {
  t.plan(1)

  delete window.string

  torrentJs(magnetLinks.pathTest, {path: '/string.js'})
    .then(() => t.equals(window.string, 'string loaded'))
    .catch((err) => t.fail(err.message))
})
