const getPort = require('get-server-port')
const test = require('tape')
const http = require('http')

const httpNdjson = require('./')

test('should assert input types', function (t) {
  t.plan(2)
  const server = http.createServer(function (req, res) {
    t.throws(httpNdjson.bind(null), /req/)
    t.throws(httpNdjson.bind(null, req), /res/)
    res.end()
    this.close()
  }).listen()

  http.get('http://localhost:' + getPort(server))
})

test('should log things', function (t) {
  t.plan(8)
  var n = 0
  const server = http.createServer(function (req, res) {
    const log = httpNdjson(req, res)
    log.on('data', function (str) {
      const data = JSON.parse(str)
      if (!n++) {
        t.same(data, {
          name: 'http',
          message: 'request',
          method: 'GET',
          url: '/'
        }, 'test request msg')
        res.end()
        server.close()
      } else {
        t.equal(typeof data, 'object', 'typeof msg')
        t.equal(data.name, 'http', 'name')
        t.equal(data.url, '/', 'url')
        t.equal(data.statusCode, 200, 'statusCode')
        t.equal(data.message, 'response', 'response')
        t.equal(typeof data.elapsed, 'number', 'time elapsed')
        t.notOk(data.contentLength, 'no content length')
      }
    })
  }).listen()

  http.get('http://localhost:' + getPort(server))
})

test('should set content length', function (t) {
  t.plan(2)
  var n = 0
  const server = http.createServer(function (req, res) {
    const log = httpNdjson(req, res)
    log.on('data', function (str) {
      const data = JSON.parse(str)
      if (!n++) {
        log.setContentLength(500)
        res.end()
        server.close()
      } else {
        t.equal(typeof data, 'object', 'typeof msg')
        t.equal(data.contentLength, 500, 'content length')
      }
    })
  }).listen()

  http.get('http://localhost:' + getPort(server))
})
