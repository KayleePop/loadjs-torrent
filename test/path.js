import torrentJs from '../loadjs-torrent'
import test from 'tape'
import WebTorrent from 'webtorrent'

test('only the one file specified by path option is loaded', (t) => {
  t.plan(1)

  delete window.string
  // magnet link from ./fixtures/pathTest.torrent
  torrentJs('magnet:?xt=urn:btih:8fa4ef46f339b75130f132ef2229c8473b447670&dn=pathTest&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com', {path: 'string.js'})
    .then(() => t.equals(window.string, 'string loaded'))
    .catch((err) => t.fail(err.message))
})

test('globstar correctly loads entire folder', (t) => {
  t.plan(1)

  delete window.string
  // magnet link from ./fixtures/pathTest.torrent
  torrentJs('magnet:?xt=urn:btih:8fa4ef46f339b75130f132ef2229c8473b447670&dn=pathTest&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com', {path: 'folder/**'})
    .then(() => t.equals(window.string, 'undefinedloadedloaded'))
    .catch((err) => t.fail(err.message))
})

test('using the same client with opts.client loads files correctly', (t) => {
  t.plan(2)

  let client = new WebTorrent()

  delete window.string
  // magnet link from ./fixtures/pathTest.torrent
  torrentJs('magnet:?xt=urn:btih:8fa4ef46f339b75130f132ef2229c8473b447670&dn=pathTest&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com', {path: 'string.js', client: client})
    .then(() => {
      t.equals(window.string, 'string loaded')

      delete window.string
      // magnet link from ./fixtures/pathTest.torrent
      return torrentJs('magnet:?xt=urn:btih:8fa4ef46f339b75130f132ef2229c8473b447670&dn=pathTest&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com', {path: 'other.js', client: client})
    })
    .then(() => t.equals(window.string, 'wrong file loaded'))
    .catch((err) => t.fail(err.message))
})

test('using an initial slash should still load the file correctly', (t) => {
  t.plan(1)

  delete window.string
  // magnet link from ./fixtures/pathTest.torrent
  torrentJs('magnet:?xt=urn:btih:8fa4ef46f339b75130f132ef2229c8473b447670&dn=pathTest&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com', {path: '/string.js'})
    .then(() => t.equals(window.string, 'string loaded'))
    .catch((err) => t.fail(err.message))
})
