const isReq = require('is-incoming-message')
const isRes = require('is-server-response')
const eos = require('end-of-stream')
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
  var size = null

  serialize.setContentLength = function (nwSize) {
    size = nwSize
  }

  serialize.write({
    name: 'http',
    message: 'request',
    method: req.method,
    url: req.url
  })

  eos(res, function (err) {
    if (err) serialize.write({ name: 'error', message: err })

    const out = {
      name: 'http',
      message: 'response',
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      elapsed: Date.now() - start
    }
    if (size !== null) out.contentLength = size
    serialize.end(out)
  })

  return serialize
}
