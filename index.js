const isReq = require('is-incoming-message')
const isRes = require('is-server-response')
const extend = require('xtend/mutable')
const eos = require('end-of-stream')
const assert = require('assert')
const ndjson = require('ndjson')

module.exports = httpNdjson

// Log http requests as ndjson
// (obj, obj, obj) -> null
function httpNdjson (req, res, opts) {
  opts = opts || {}

  assert.ok(isReq(req), 'is req')
  assert.ok(isRes(res), 'is res')
  assert.equal(typeof opts, 'object', 'is object')

  const serialize = ndjson.serialize()
  const start = Date.now()
  var size = null

  serialize.setContentLength = function (nwSize) {
    size = nwSize
  }

  const headers = req.headers
  const request = {
    name: 'http',
    message: 'request',
    method: req.method,
    remoteAddress: req.connection.remoteAddress,
    url: req.url
  }
  if (headers['x-forwarded-for']) {
    request.xForwardedFor = headers['x-forwarded-for']
  }
  if (headers['x-real-ip']) {
    request.xRealIp = headers['x-real-ip']
  }
  if (headers['http-client-ip']) {
    request.httpClientIp = headers['http-client-ip']
  }
  if (opts.req) extend(request, opts.req)
  serialize.write(request)

  eos(res, function (err) {
    if (err) serialize.write({ name: 'error', message: err })

    const response = {
      name: 'http',
      message: 'response',
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      elapsed: Date.now() - start
    }
    if (size !== null) response.contentLength = size
    if (opts.res) extend(response, opts.res)
    serialize.end(response)
  })

  return serialize
}
