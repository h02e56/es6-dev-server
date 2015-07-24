'use strict'
var http = require('http')
var parse = require('url').parse

var ecstatic = require('ecstatic')(__dirname + '/static')
var router = require('routes')()
var debug = require('debug')('>> Server')

var config = require('./config.js')
var PORT = config.PORT
var hostName = config.hostName

// ROUTES
// in case get messy use:
// router.addRoute('/', require('./routes/index.js'))

// upload binary file
router.addRoute('/upload', require('./routes/upload'))

router.addRoute('/hi', function (req, res) {
  res.setHeader('content-type', 'text/html')
  res.statusCode = 200
  res.end('hi')
})

router.addRoute('/json', function (req, res) {
  res.setHeader('content-type', 'application/json')
  res.statusCode = 200
  res.end(JSON.stringify({
    ok: true,
    data: {
      name: 'joe'
    }
  }))
})

var fireBrowserSync = config.fireBrowserSync

var server = http.createServer(function (req, res) {
  var m = router.match(req.url)
  if (m) m.fn(req, res, m.params)
  else ecstatic(req, res)
})

function listen (cb) {
  server.listen(PORT, hostName, function () {
    if(fireBrowserSync) fireBrowserSync()
    cb(server)
  })
}

module.exports = listen
