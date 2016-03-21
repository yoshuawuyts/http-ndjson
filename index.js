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

  const key = opts.key || 'message'
  const start = Date.now()
  var size = null

  function setContentLength (nwSize) {
    size = nwSize
  }

  const request = {
    name: 'http',
    method: req.method,
    headers: req.headers,
    remoteAddress: req.connection.remoteAddress,
    url: req.url
  }
  request[key] = 'request'

  if (opts.req) extend(request, opts.req)
  cb(request)

  eos(res, function (err) {
    if (err) {
      const arg = { name: 'error' }
      ;(opts.bunyan) ? arg.msg = err : arg.message = err
      cb(arg)
    }

    const response = {
      name: 'http',
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      elapsed: Date.now() - start
    }
    response[key] = 'response'

    if (size !== null) response.contentLength = size
    if (opts.res) extend(response, opts.res)
    cb(response)
  })

  return setContentLength
}
