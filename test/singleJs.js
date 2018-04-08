const torrentJs = require('../loadjs-torrent')
const test = require('tape')

test('Single Js file should be correctly loaded', (t) => {
  t.plan(1)

  delete window.test
  // magnet link from ./fixtures/windowString.torrent
  torrentJs('magnet:?xt=urn:btih:0067a9ede2fa07e9d0374713bd4621b447292c62&dn=windowString.js&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com')
    .then(() => t.equals(window.test, 'torrent load success'))
    .catch((err) => t.fail(err.message))
})
