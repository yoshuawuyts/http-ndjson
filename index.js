const isReq = require('is-incoming-message')
const isRes = require('is-server-response')
const assert = require('assert')
const ndjson = require('ndjson')

module.exports = httpNdjson

// Log http requests as ndjson
// (obj, obj) -> null
function httpNdjson (req, res) {
  assert.ok(isReq(req), 'is req')
  assert.ok(isRes(res), 'is res')

  const serialize = ndjson.serialize()
  const start = Date.now()

  serialize.write({
    name: 'http',
    message: '<-- ' + req.method,
    url: req.url
  })

  res.on('finish', function () {
    const elapsed = Date.now() - start
    serialize.end({
      name: 'http',
      message: '--> ' + req.method,
      url: req.url,
      statusCode: res.statusCode,
      elapsed: elapsed + 'ms'
    })
  })

  res.on('error', function () {
    serialize.end()
  })

  return serialize
}
