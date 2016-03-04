const extend = require('xtend/mutable')
const eos = require('end-of-stream')

module.exports = httpNdjson

// Log http requests as ndjson
// (obj, obj, obj, fn) -> null
function httpNdjson (req, res, opts, cb) {
  if (!cb) {
    cb = opts
    opts = {}
  }
  opts = opts || {}

  const start = Date.now()
  var size = null

  function setContentLength (nwSize) {
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
  cb(request)

  eos(res, function (err) {
    if (err) cb({ name: 'error', message: err })

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
    cb(response)
  })

  return setContentLength
}
