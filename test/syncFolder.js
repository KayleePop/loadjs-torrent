import torrentJs from '../loadjs-torrent'
import test from 'tape'

test('folders loaded with async:false should load in order', (t) => {
  t.plan(1)

  delete window.string
  // magnet link from ./fixtures/syncTest.torrent
  torrentJs('magnet:?xt=urn:btih:7628514747fcdcb7ec76c5a34449d1a7fd2748db&dn=syncTest&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com', {async: false})
    .then(() => t.equals(window.string, 'first file loaded, and the second too'))
    .catch((err) => t.fail(err.message))
})
