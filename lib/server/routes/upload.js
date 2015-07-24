'use strict'
var fs = require('fs')
var path = require('path')
var assert = require('assert')
// folder where save files

var uploadFolder = path.join(process.cwd(), '/lib/uploads')

module.exports = function (req, res, params) {
  res.setHeader('Content-Type', 'application/json')
  var ws = fs.createWriteStream(uploadFolder + '/test.scss')
  ws.on('close', function () {
    res.end(JSON.stringify({
      ok: true
    }))
  })
  req.pipe(ws)
}
