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

  serialize.write({
    name: 'http',
    message: 'request',
    method: req.method,
    url: req.url
  })

  eos(res, function (err) {
    if (err) serialize.write({ name: 'error', message: err })

    const elapsed = Date.now() - start
    serialize.end({
      name: 'http',
      message: 'response',
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      elapsed: elapsed + 'ms'
    })
  })

  return serialize
}
