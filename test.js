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
          name: '->',
          url: '/',
          type: 'request'
        })
        res.end()
        server.close()
      } else {
        t.equal(typeof data, 'object')
        t.equal(data.name, '<-')
        t.equal(data.url, '/')
        t.equal(data.statusCode, 200)
        t.ok(/ms$/.test(data.elapsed), 'time elapsed')
        t.equal(data.type, 'request')
        res.end()
        server.close()
      }
    })
  }).listen()

  nets('http://localhost:' + getPort(server))
})
