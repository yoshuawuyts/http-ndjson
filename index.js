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
    name: '->',
    url: req.url,
    type: 'request'
  })

  res.on('finish', function () {
    const elapsed = Date.now() - start
    serialize.write({
      name: '<-',
      url: req.url,
      statusCode: res.statusCode,
      elapsed: elapsed + 'ms',
      type: 'request'
    })
  })

  return serialize
}
