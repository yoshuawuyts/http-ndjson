# http-ndjson
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![Downloads][downloads-image]][downloads-url]
[![js-standard-style][standard-image]][standard-url]

Log http requests as ndjson. Works pretty well with `bole`, so you should
probably use it with that. That is my recommendation.

## Installation
```sh
$ npm install http-ndjson
```

## Usage
```js
const httpNdjson = require('http-ndjson')
const http = require('http')

http.createServer(function (req, res) {
  const setSize = httpNdjson(req, res, console.log)
  const myCoolResponse = 'chickens'
  setSize(myCoolResponse.length)
  res.end(myCoolResponse)
}).listen()
```
```js
{ name: 'http', method: 'GET', message: 'request', url: '/' }
{ name: 'http', method: 'GET', message: 'response', url: '/', statusCode: 200, elapsed: '5ms' }
```

## Log custom properties
`http-ndjson` logs a sensible set of standard properties, but sometimes there's
a need to dive in and log more. An optional third argument can be added with
custom fields that will be logged on either `request` or `response`.
```js
const httpNdjson = require('http-ndjson')
const http = require('http')

http.createServer(function (req, res) {
  const opts = { req: { requestId: req.headers['requestId'] } }
  httpNdjson(req, res, opts, console.log)
  res.end()
}).listen()
```

## Forward headers
Determining the origin of a request can be hard when using reverse-proxies.
It's not too uncommon for users to mask their IP by providing an
`x-forwarded-for` header. `http-ndjson` makes no assumptions about forwarding
headers and logs all properties instead. The following headers are logged:
- __x-forwarded-for:__ standardized reverse proxy header ([rfc7239][7239])
- __x-real-ip:__ non-standard reverse proxy header
- __http-client-ip:__ non-standard reverse proxy header

## API
### readStream = httpNdjson(req, res, opts?, cb)
Create an http logger. Returns a write stream. Opts can contain the following
values:
- __req:__ an object with values that will be logged on `request`
- __res:__ an object with values that will be logged on `response`
- __opts:__ set options
- __cb:__ handle the returned message

## See Also
- [bole](https://github.com/rvagg/bole)
- [garnish](https://github.com/mattdesl/garnish)
- [ndjson](https://github.com/maxogden/ndjson)

## License
[MIT](https://tldrlegal.com/license/mit-license)

[npm-image]: https://img.shields.io/npm/v/http-ndjson.svg?style=flat-square
[npm-url]: https://npmjs.org/package/http-ndjson
[travis-image]: https://img.shields.io/travis/yoshuawuyts/http-ndjson/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/yoshuawuyts/http-ndjson
[codecov-image]: https://img.shields.io/codecov/c/github/yoshuawuyts/http-ndjson/master.svg?style=flat-square
[codecov-url]: https://codecov.io/github/yoshuawuyts/http-ndjson
[downloads-image]: http://img.shields.io/npm/dm/http-ndjson.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/http-ndjson
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard
[7239]: https://tools.ietf.org/html/rfc7239
