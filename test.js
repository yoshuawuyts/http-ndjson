const test = require('tape')
const httpNdjson = require('./')

test('should assert input types', function (t) {
  t.plan(1)
  t.throws(httpNdjson)
})
