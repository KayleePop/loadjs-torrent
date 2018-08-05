const torrentJs = require('../loadjs-torrent')
const test = require('tape-promise/tape')
const magnetLinks = require('./shared/magnetLinks.js')

test('css and js files (and only css and js) should be loaded correctly from a torrent folder', async (t) => {
  delete window.multipleTest
  delete window.imageTest
  document.querySelector('body').style = {}

  await torrentJs(magnetLinks.multiple)
  t.equals(window.multipleTest, 'folder load success')
  let color = window.getComputedStyle(document.body).getPropertyValue('background-color')
  t.equals(color, 'rgb(205, 92, 92)')
  t.notEquals(window.imageTest, 'image loaded')
})
