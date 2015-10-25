const getPort = require('get-server-port')
const test = require('tape')
const http = require('http')
const nets = require('nets')

const httpNdjson = require('./')

test('should assert input types', function (t) {
  t.plan(2)
  const server = http.createServer(function (req, res) {
    t.throws(httpNdjson.bind(null), /req/)
    t.throws(httpNdjson.bind(null, req), /res/)
    res.end()
    this.close()
  }).listen()

  nets('http://localhost:' + getPort(server))
})

test('should assert input types', function (t) {
  t.plan(7)
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
        })
        res.end()
        server.close()
      } else {
        t.equal(typeof data, 'object', 'typeof msg')
        t.equal(data.name, 'http', 'name')
        t.equal(data.url, '/', 'url')
        t.equal(data.statusCode, 200, 'statusCode')
        t.equal(data.message, 'response', 'response')
        t.ok(/ms$/.test(data.elapsed), 'time elapsed', 'time elapse')
        res.end()
        server.close()
      }
    })
  }).listen()

  nets('http://localhost:' + getPort(server))
})
