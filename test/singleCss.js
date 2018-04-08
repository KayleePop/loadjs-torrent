const torrentJs = require('../loadjs-torrent')
const test = require('tape')

test('single css file should be correctly loaded', (t) => {
  t.plan(1)

  document.querySelector('body').style = {}
  // magnet link from ./fixtures/bodyColor.torrent
  torrentJs('magnet:?xt=urn:btih:4bcf32d5541fc8379e184cc45721eebceb0dca4d&dn=bodyColor.css&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com')
    .then(() => {
      let color = window.getComputedStyle(document.body).getPropertyValue('background-color')
      t.equals(color, 'rgb(85, 107, 47)')
    })
    .catch((err) => t.fail(err.message))
})
