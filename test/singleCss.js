const torrentJs = require('../loadjs-torrent')
const test = require('tape-promise/tape')
const magnetLinks = require('./shared/magnetLinks.js')

test('single css file should be correctly loaded', async (t) => {
  document.querySelector('body').style = {}

  await torrentJs(magnetLinks.bodyColor)
  let color = window.getComputedStyle(document.body).getPropertyValue('background-color')
  t.equals(color, 'rgb(85, 107, 47)')
})
