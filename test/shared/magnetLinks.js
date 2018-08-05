const host = window.location.origin
module.exports = {
  multiple: `magnet:?xt=urn:btih:2c28cf61e74ff823e77dd8d8158f2c823112d02b&dn=multiple&ws=${host}&xs=${host}/multiple.torrent`,

  pathTest: `magnet:?xt=urn:btih:c1574737e2baee9817cd4a629fc7cc0cd0ea33a1&dn=pathTest&ws=${host}&xs=${host}/pathTest.torrent`,

  syncTest: `magnet:?xt=urn:btih:234f8485e697b657e2ac2febe51c8edec04c0b76&dn=syncTest&ws=${host}&xs=${host}/syncTest.torrent`,

  bodyColor: `magnet:?xt=urn:btih:e34a9c93b0e98444b2bae2ab97af612e027d55ed&dn=bodyColor.css&ws=${host}&xs=${host}/bodyColor.torrent`,

  windowString: `magnet:?xt=urn:btih:2793e5845bf423172c6144947c19fb996af279de&dn=windowString.js&ws=${host}&xs=${host}/windowString.torrent`
}
