const torrentJs = require('../loadjs-torrent')
const test = require('tape')

test('Error callback should be called on invalid path', (t) => {
  t.plan(1)

  delete window.string
  // magnet link from ./fixtures/pathTest.torrent
  torrentJs('magnet:?xt=urn:btih:8fa4ef46f339b75130f132ef2229c8473b447670&dn=pathTest&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com', {path: '/invalid'})
    .then(() => t.fail('error should be caught'))
    .catch((err) => t.equals(err.message, 'no JS or CSS files found matching this glob: /invalid'))
})
