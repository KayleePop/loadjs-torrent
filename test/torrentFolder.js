import torrentJs from '../loadjs-torrent'
import test from 'tape'

test('css and js files (and only css and js) should be loaded correctly from a torrent folder', (t) => {
  t.plan(3)

  delete window.multipleTest
  delete window.imageTest
  document.querySelector('body').style = {}
  // magnet link from ./fixtures/multiple.torrent
  torrentJs('magnet:?xt=urn:btih:c88956484470daaef2697e0d536b17da20b0ae0f&dn=multiple&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com')
    .then(() => {
      t.equals(window.multipleTest, 'folder load success')
      let color = window.getComputedStyle(document.body).getPropertyValue('background-color')
      t.equals(color, 'rgb(205, 92, 92)')
      t.notEquals(window.imageTest, 'image loaded')
    })
    .catch((err) => t.fail(err.message))
})
