const loadjs = require('loadjs')
const WebTorrent = require('webtorrent')
const glob = require('glob-to-regexp')

const loadjsPromise = function (fileUrl, cbObject = {}) {
  return new Promise((resolve, reject) => {
    cbObject.success = () => resolve()
    cbObject.error = (err) => reject(err)
    loadjs(fileUrl, cbObject)
  })
}

module.exports = async function (torrentLink, opts = {}) {
  const client = opts.client || new WebTorrent()

  const torrent = client.get(torrentLink) || client.add(torrentLink)

  client.on('error', (err) => { throw err })
  torrent.on('error', (err) => { throw err })

  // wait for metadata before using files
  if (!torrent.metadata) {
    await new Promise((resolve) => {
      torrent.on('metadata', () => resolve())
    })
  }

  const filesToLoad = torrent.files.filter((file) => {
    // only set rootDir if the file in in a directory
    const rootDir = /\//.test(file.path) ? (torrent.name + '/') : ''

    let globPath = '**' // default glob is matching everything
    if (opts.path) globPath = opts.path.replace(/^\//, '') // remove initial / if present

    const matchesGlob = glob(rootDir + globPath, {globstar: true}).test(file.path)
    return matchesGlob && /\.css$|\.js$/.test(file.name) // only match .css and .js files
  })

  if (filesToLoad.length < 1) {
    throw new Error('no JS or CSS files found ' + (opts.path ? ('matching this glob: ' + opts.path) : 'in torrent'))
  }

  const fileUrlPromises = filesToLoad.map(file => {
    return new Promise((resolve, reject) => {
      file.getBlobURL((err, fileUrl) => {
        if (err) reject(err)

        if (/\.css$/.test(file.name)) {
          fileUrl = 'css!' + fileUrl
        }
        resolve(fileUrl)
      })
    })
  })

  // callback object to pass into loadjs
  const cbObject = {
    async: opts.async,
    before: opts.before
  }

  if (opts.async) {
    // wait for all to finish downloading and loading in any order
    await Promise.all(fileUrlPromises.map(fileUrlPromise => {
      return fileUrlPromise.then(fileUrl => loadjsPromise(fileUrl, cbObject))
    }))
  } else {
    // load each in order as it finishes downloading
    for (const fileUrlPromise of fileUrlPromises) {
      const fileUrl = await fileUrlPromise
      // wait until the file is loaded to load the next one
      await loadjsPromise(fileUrl, cbObject)
    }
  }
}
