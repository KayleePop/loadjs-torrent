const torrentJs = require('../loadjs-torrent')
const test = require('tape')
const magnetLinks = require('./shared/magnetLinks.js')

test('css and js files (and only css and js) should be loaded correctly from a torrent folder', (t) => {
  t.plan(3)

  delete window.multipleTest
  delete window.imageTest
  document.querySelector('body').style = {}

  torrentJs(magnetLinks.multiple)
    .then(() => {
      t.equals(window.multipleTest, 'folder load success')
      let color = window.getComputedStyle(document.body).getPropertyValue('background-color')
      t.equals(color, 'rgb(205, 92, 92)')
      t.notEquals(window.imageTest, 'image loaded')
    })
    .catch((err) => t.fail(err.message))
})
