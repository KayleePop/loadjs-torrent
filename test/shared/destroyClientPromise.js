module.exports = function (client) {
  return new Promise((resolve, reject) => {
    client.destroy(err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}
