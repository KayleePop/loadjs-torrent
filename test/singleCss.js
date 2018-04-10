const torrentJs = require('../loadjs-torrent')
const test = require('tape')
const magnetLinks = require('./shared/magnetLinks.js')

test('single css file should be correctly loaded', (t) => {
  t.plan(1)

  document.querySelector('body').style = {}

  torrentJs(magnetLinks.bodyColor)
    .then(() => {
      let color = window.getComputedStyle(document.body).getPropertyValue('background-color')
      t.equals(color, 'rgb(85, 107, 47)')
    })
    .catch((err) => t.fail(err.message))
})
