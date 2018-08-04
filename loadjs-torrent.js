const loadjs = require('loadjs')
const WebTorrent = require('webtorrent')
const glob = require('glob-to-regexp')

let torrentJs = (torrentLink, opts) => {
  if (!opts) opts = {}

  let client = opts.client || new WebTorrent()

  return new Promise((resolve, reject) => {
    let existingTorrent = client.get(torrentLink) // null if it doesn't exist

    if (existingTorrent) {
      loadFile(existingTorrent)
    } else {
      client.add(torrentLink, loadFile)
    }

    client.on('error', (err) => reject(err))

    function loadFile (torrent) {
      torrent.on('error', (err) => reject(err))

      let filesToLoad = torrent.files.filter((file) => {
        // only set rootDir if the file in in a directory
        let rootDir = /\//.test(file.path) ? (torrent.name + '/') : ''

        let globPath = '**' // default glob is matching everything
        if (opts.path) globPath = opts.path.replace(/^\//, '') // remove initial / if present

        let matchesGlob = glob(rootDir + globPath, {globstar: true}).test(file.path)
        return matchesGlob && /\.css$|\.js$/.test(file.name) // only match .css and .js files
      })

      if (filesToLoad.length < 1) {
        reject(new Error('no JS or CSS files found ' + (opts.path ? ('matching this glob: ' + opts.path) : 'in torrent')))
      }

      // callback object to pass into loadjs
      let cbObject = {
        async: opts.async,
        before: opts.before
      }

      let filePromises = filesToLoad.map((file) => {
        return new Promise((resolveFile, rejectFile) => { // eslint-disable-line
          file.getBlobURL((err, fileUrl) => {
            if (err) reject(new Error(err))

            if (/\.css$/.test(file.name)) {
              fileUrl = 'css!' + fileUrl
            }

            if (!opts.async) {
              resolveFile(fileUrl)
            } else {
              cbObject.success = () => { resolveFile() }
              cbObject.error = (err) => { rejectFile(err) }
              loadjs(fileUrl, cbObject)
            }
          })
        })
      })

      Promise.all(filePromises)
        .then((fileUrls) => {
          if (!opts.async) {
            cbObject.success = () => { resolve() }
            cbObject.error = (err) => { reject(err) }
            loadjs(fileUrls, cbObject)
          } else {
            resolve()
          }
        })
        .catch((err) => reject(err))
    }
  })
}

module.exports = torrentJs
