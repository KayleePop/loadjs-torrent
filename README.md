# TorrentJs

[![Node.js CI](https://github.com/KayleePop/loadjs-torrent/workflows/Node.js%20CI/badge.svg)](https://github.com/KayleePop/loadjs-torrent/actions)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![npm](https://img.shields.io/npm/v/loadjs-torrent.svg)](https://www.npmjs.com/package/loadjs-torrent)

<img src="icon.png" width="300px">

An extension of [LoadJS](https://github.com/muicss/loadjs) that uses torrents instead of http links.

Users will download assets via WebTorrent, and seed those files immediately. This allows for easy and automatic peer to peer load balancing of a site's JS and CSS files.

# Installation
`npm install loadjs-torrent`

# Usage
```javascript
let torrentJs = require('loadjs-torrent')

// magnet link to individual css/js file or torrent folder
let magnetLink = 'magnet:?xt=urn:btih:0067a9ede2fa07e9d0374713bd4621b447292c62&dn=windowString.js&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openWebTorrent.com'

// all JS and CSS files will be loaded from the torrent, including all subdirectories
// other file extensions are ignored
torrentJs(magnetLink)
  .then(() => {
    console.log('torrent loaded successfully!')
    // logic for after the script loads
  })
  .catch((err) => {
    console.log('Error: ' + err)
    // error handling
  })
```
Or use the minified file from this repository. Be sure to use the cdn link on rawgit for production apps.
```html
<script src="https://rawgit.com/KayleePop/loadjs-torrent/master/loadjs-torrent.min.js"></script>
<script>
// magnet link to individual css/js file or torrent folder
let magnetLink = 'magnet:?xt=urn:btih:0067a9ede2fa07e9d0374713bd4621b447292c62&dn=windowString.js&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openWebTorrent.com'

// all JS and CSS files will be loaded from the torrent, including all subdirectories
// other file extensions are ignored
torrentJs(magnetLink)
  .then(() => {
    console.log('torrent loaded successfully!')
    // logic for after the script loads
  })
  .catch((err) => {
    console.log('Error: ' + err)
    // error handling
  })
</script>
```

# API

## `async torrentJs(magnetLink, opts)`
#### Returns:
A Promise that resolves on successful loading of all files

##### Options
opts contains these defaults:
```javascript
{
  path: '/**', // a glob to specify a subset of files to load
  async: true, // whether to load files asynchronously
  client: new WebTorrent(), // WebTorrent client to use
  before(path, scriptEl) {} // called before DOM insertion of files
}
```

## Path
##### Default: `'/**'`
A glob pattern matching the files you wish to load from the torrent. Only .js and .css files that match the glob will be loaded, other filetypes and un-matched files will be ignored.

Matched files will be highly prioritized, but other files in the torrent will also be downloaded and seeded.

##### Examples:
```javascript
torrentJs(magnetLink, {path: '/folder/otherFolder/*.js'})

torrentJs(magnetLink, {path: '**/*.js'}) // loads all javascript files

torrentJs(magnetlink, {path: '/dir/**'}) // loads all JS and CSS from dir
```

## Async
##### Default: `true`
A boolean stating whether execution order matters for the loaded scripts.

If true, scripts will be loaded in the order that they finish downloading, and the `async` attribute will be applied, like this:
```html
<script src="..." async></script>
```

If false, scripts will be loaded in order as each one finishes downloading and will execute in order without the async attribute. If one script takes a very long time to load, then it will block the scripts after it but not before it.

The order is based on the torrent, and it can be customized on creation with a Bittorrent client. Custom ordering is possible with Vuze.

## Client
##### Default: `new WebTorrent()`
The WebTorrent client instance to use.

Creating a new WebTorrent client for every file creates unnecessary overhead, so you can pass in an existing one for torrentJs to use instead.

##### Example:
```javascript
let WebTorrent = require('webtorrent')
let torrentClient = new WebTorrent()

torrentJs(magnetLink, {path: 'script.js', client: torrentClient})

torrentJs(magnetLink, {path: 'otherScript.js', client: torrentClient})

torrentJs(otherMagnetLink, {client: torrentClient})
```

## Before
##### Default: `(path, scriptEl) => {}`
A function that is passed directly into loadjs. It executes just before the script or style tag is created. DOM insertion can be customized using the before callback as well.

[See the loadjs docs for more info](https://github.com/muicss/loadjs#documentation)

The path param will be a blobUrl pointing to the downloaded file.


## Feel free to open an issue with questions

# Development
### Tests
Run tests like this:

`npm test`

Make sure you are seeding the test fixtures before testing. Use a WebTorrent compatible torrent client.

### Build
Build and minify like so:

`npm run build`
