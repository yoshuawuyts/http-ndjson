# http-ndjson
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![Downloads][downloads-image]][downloads-url]
[![js-standard-style][standard-image]][standard-url]

Log http requests as ndjson.

## Installation
```sh
$ npm install http-ndjson
```

## Usage
```js
const httpNdjson = require('http-ndjson')
const http = require('http')

http.createServer((req, res) => {
  httpNdjson(req, res).pipe(process.stdout)
  res.end()
}).listen()
```
```js
{ name: 'http', method: 'GET', message: 'request', url: '/' }
{ name: 'http', method: 'GET', message: 'response', url: '/', statusCode: 200, elapsed: '5ms' }
```

## API
### writeStream = httpNdjson(req, res)
Create an http logger. Returns a write stream.

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
