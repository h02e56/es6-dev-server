'use strict'
import path from 'path'
import fs from 'fs'
import test from 'tape'
import Server from '../../lib/server'
import request from 'request'
import config from '../../lib/server/config.js'

var baseUrl
var server
// before run fn
test('Before run: wake up server', (t) => {
  baseUrl = 'http://' + config.hostName + ':' + config.PORT
  Server((sv) => {
    server = sv
    t.equal(typeof server, 'object', 'server created OK')
    t.equal(typeof server.close, 'function', 'server exposes his methods')
    t.end()
  })
})

// Server tests
test('server sends json data', (t) => {
  var url = baseUrl + '/json'
  request.get(url, (err, res, body) => {
    if (err) t.notOk(err, 'we dont receive an error')
    t.equal(res.statusCode, 200, 'we get a 200 status code')
    t.equal(typeof JSON.parse(body), 'object', 'we got a json object from server')
    t.end()
  })
})

test('server sends plain text', (t) => {
  var url = baseUrl + '/hi'
  request(url, (err, res, body) => {
    if (err) t.notOk(err, 'we dont receive an error')
    t.equal(res.statusCode, 200, 'we get a 200 status code')
    t.equal(body, 'hi', 'receive plain text')
    t.end()
  })
})

// upload file
// test('server accepts direct upload file', (t) => {
//   var url = baseUrl + '/upload'
//   var file = fs.readFileSync('./test/server/files/custom.scss')
//   var opt = {
//     url: url,
//     method: 'POST',
//     body: file,
//     headers: {
//       'Content-type': 'application/octet-binary'
//     }
//   }
//   request.post(opt, (err, res, body) => {
//     var data = JSON.parse(body)
//     if (err) t.notOk(err, 'we dont receive an error')
//     t.equal(typeof data, 'object', 'we got a json object from server')
//     t.ok(data.ok, 'we got ok:true response from server')
//     t.end()
//   })
// })

// teardown fn
test('Teardown: close server', (t) => {
  server.close(() => {
    t.ok(true, 'server has closed right')
    t.end()
  })
})
