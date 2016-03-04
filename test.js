// const getPort = require('get-server-port')
// const test = require('tape')
// const http = require('http')

require('./')

// test('should log things', function (t) {
//   t.plan(13)
//   var n = 0
//   const server = http.createServer(function (req, res) {
//     const log = httpNdjson(req, res)
//     log.on('data', function (str) {
//       const data = JSON.parse(str)
//       if (!n++) {
//         t.equal(typeof data, 'object', 'typeof msg')
//         t.equal(data.name, 'http', 'name')
//         t.equal(data.method, 'GET', 'method')
//         t.equal(data.url, '/', 'url')
//         t.equal(data.message, 'request', 'request')
//         t.ok(/127\.0\.0\.1$/.test(data.remoteAddress), 'remote address')
//         res.end()
//         server.close()
//       } else {
//         t.equal(typeof data, 'object', 'typeof msg')
//         t.equal(data.name, 'http', 'name')
//         t.equal(data.url, '/', 'url')
//         t.equal(data.statusCode, 200, 'statusCode')
//         t.equal(data.message, 'response', 'response')
//         t.equal(typeof data.elapsed, 'number', 'time elapsed')
//         t.notOk(data.contentLength, 'no content length')
//       }
//     })
//   }).listen()

//   http.get('http://localhost:' + getPort(server))
// })

// test('should set content length', function (t) {
//   t.plan(2)
//   var n = 0
//   const server = http.createServer(function (req, res) {
//     const log = httpNdjson(req, res)
//     log.on('data', function (str) {
//       const data = JSON.parse(str)
//       if (!n++) {
//         log.setContentLength(500)
//         res.end()
//         server.close()
//       } else {
//         t.equal(typeof data, 'object', 'typeof msg')
//         t.equal(data.contentLength, 500, 'content length')
//       }
//     })
//   }).listen()

//   http.get('http://localhost:' + getPort(server))
// })

// test('should allow options', function (t) {
//   t.plan(3)
//   var n = 0
//   const server = http.createServer(function (req, res) {
//     const opts = { req: { foo: 'bar' }, res: { bin: 'baz' } }
//     const log = httpNdjson(req, res, opts)
//     log.on('data', function (str) {
//       const data = JSON.parse(str)
//       if (!n++) {
//         t.equal(data.foo, 'bar', 'custom prop')
//         res.end()
//         server.close()
//       } else {
//         t.equal(typeof data, 'object', 'typeof msg')
//         t.equal(data.bin, 'baz', 'custom prop')
//       }
//     })
//   }).listen()

//   http.get('http://localhost:' + getPort(server))
// })

// test('should log forward headers', function (t) {
//   t.plan(3)
//   var n = 0
//   const server = http.createServer(function (req, res) {
//     const opts = { req: { foo: 'bar' }, res: { bin: 'baz' } }
//     const log = httpNdjson(req, res, opts)
//     log.on('data', function (str) {
//       const data = JSON.parse(str)
//       if (!n++) {
//         t.equal(data.xForwardedFor, 'foo', 'xForwardedFor')
//         t.equal(data.xRealIp, 'bar', 'xRealIp')
//         t.equal(data.httpClientIp, 'baz', 'httpClientIp')
//         res.end()
//         server.close()
//       }
//     })
//   }).listen()

//   const opts = {
//     hostname: 'localhost',
//     port: getPort(server),
//     headers: {
//       'x-forwarded-for': 'foo',
//       'x-real-ip': 'bar',
//       'http-client-ip': 'baz'
//     }
//   }
//   http.get(opts)
// })
