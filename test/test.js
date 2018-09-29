const torrentJs = require('../loadjs-torrent')
const magnetLinks = require('./fixtures/magnetLinks.js')
const WebTorrent = require('webtorrent')
const test = require('muggle-test')
const assert = require('muggle-assert')

const destroyClient = async (client) => {
  // clear store
  if (client.torrents[0] && client.torrents[0].store) {
    await new Promise((resolve, reject) => {
      client.torrents[0].store.destroy((err) => {
        if (err) reject(err)

        resolve()
      })
    })
  }

  // stop connections and event emitters
  await new Promise((resolve, reject) => {
    client.destroy((err) => {
      if (err) reject(err)

      resolve()
    })
  })
}

test('single css file should be correctly loaded', async () => {
  const client = new WebTorrent()

  // clear old style
  document.querySelector('body').style = {}

  await torrentJs(magnetLinks.bodyColor, { client: client })
  let color = window.getComputedStyle(document.body).getPropertyValue('background-color')
  assert.equal(color, 'rgb(85, 107, 47)')

  await destroyClient(client)
})

test('single Js file should be correctly loaded', async () => {
  const client = new WebTorrent()

  delete window.test

  await torrentJs(magnetLinks.windowString, { client: client })
  assert.equal(window.test, 'torrent load success')

  await destroyClient(client)
})

test('should reject on invalid path', async () => {
  const client = new WebTorrent()

  await assert.rejects(
    torrentJs(magnetLinks.pathTest, { client: client, path: '/invalid' }),
    new Error('no JS or CSS files found matching this glob: /invalid')
  )

  await destroyClient(client)
})

test('only the one file specified by path option should load', async () => {
  const client = new WebTorrent()

  delete window.string

  await torrentJs(magnetLinks.pathTest, { client: client, path: 'string.js' })
  assert.equal(window.string, 'string loaded')

  await destroyClient(client)
})

test('globstar should correctly loads entire folder', async () => {
  const client = new WebTorrent()

  delete window.string

  await torrentJs(magnetLinks.pathTest, { client: client, path: 'folder/**' })
  assert.equal(window.string, 'undefinedloadedloaded')

  await destroyClient(client)
})

test('using the same client with opts.client should load files correctly', async () => {
  const client = new WebTorrent()

  delete window.string

  await torrentJs(magnetLinks.pathTest, { path: 'string.js', client: client })
  assert.equal(window.string, 'string loaded')

  delete window.string

  await torrentJs(magnetLinks.pathTest, { path: 'other.js', client: client })
  assert.equal(window.string, 'wrong file loaded')

  await destroyClient(client)
})

test('using an initial slash in the path should still load the file correctly', async () => {
  const client = new WebTorrent()

  delete window.string

  await torrentJs(magnetLinks.pathTest, { client: client, path: '/string.js' })
  assert.equal(window.string, 'string loaded')

  await destroyClient(client)
})

test('folders loaded with async:false should load in order', async () => {
  const client = new WebTorrent()

  delete window.string

  await torrentJs(magnetLinks.syncTest, { client: client, async: false })
  assert.equal(window.string, 'first file loaded, and the second too')

  await destroyClient(client)
})

test('css and js files (and only css and js) should be loaded correctly from a torrent folder', async () => {
  const client = new WebTorrent()

  // clear any existing state
  delete window.multipleTest
  delete window.imageTest
  document.querySelector('body').style = {}

  await torrentJs(magnetLinks.multiple, { client: client })

  assert.equal(window.multipleTest, 'folder load success')

  let color = window.getComputedStyle(document.body).getPropertyValue('background-color')
  assert.equal(color, 'rgb(205, 92, 92)')

  assert.equal(window.imageTest, undefined, 'javascript file with image extension should not be loaded')

  await destroyClient(client)
})
