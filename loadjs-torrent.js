const loadjs = require('loadjs')
const WebTorrent = require('webtorrent')
const glob = require('glob-to-regexp')

module.exports = (torrentLink, opts = {}) => {
  const client = opts.client || new WebTorrent()

  return new Promise((resolve, reject) => {
    const torrent = client.get(torrentLink) || client.add(torrentLink)

    // wait for metadata before using files
    if (torrent.metadata) {
      loadFile(torrent)
    } else {
      torrent.on('metadata', () => loadFile(torrent))
    }

    client.on('error', (err) => reject(err))

    function loadFile (torrent) {
      torrent.on('error', (err) => reject(err))

      const filesToLoad = torrent.files.filter((file) => {
        // only set rootDir if the file in in a directory
        const rootDir = /\//.test(file.path) ? (torrent.name + '/') : ''

        let globPath = '**' // default glob is matching everything
        if (opts.path) globPath = opts.path.replace(/^\//, '') // remove initial / if present

        const matchesGlob = glob(rootDir + globPath, {globstar: true}).test(file.path)
        return matchesGlob && /\.css$|\.js$/.test(file.name) // only match .css and .js files
      })

      if (filesToLoad.length < 1) {
        reject(new Error('no JS or CSS files found ' + (opts.path ? ('matching this glob: ' + opts.path) : 'in torrent')))
      }

      // callback object to pass into loadjs
      const cbObject = {
        async: opts.async,
        before: opts.before
      }

      const filePromises = filesToLoad.map((file) => {
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
