'use strict'
var env = process.env.NODE_ENV || 'production'

var debug = require('debug')('>> Config')
var browserSync = require('browser-sync')

var config = {
  PORT: (env === 'development') ? 3000 : 3004,
  hostName: (env === 'development') ? 'localhost' : 'localhost',
  fireBrowserSync: (env === 'development') ? fireBrowserSync : null
}

function fireBrowserSync () {
  return browserSync({
    proxy: config.hostName + ':' + config.PORT,
    files: [
      __dirname + '/static/js/build.js',
      __dirname + '/static/css/*.css',
      __dirname + '/static/*.hbs',
      __dirname + '/static/*.html'
    ],
    logLevel: 'info',
    logPrefix: 'development',
    open: false// dont open browser)
  })
}

debug(config)
module.exports = config
