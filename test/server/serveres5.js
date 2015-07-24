'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _libServer = require('../../lib/server');

var _libServer2 = _interopRequireDefault(_libServer);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _libServerConfigJs = require('../../lib/server/config.js');

var _libServerConfigJs2 = _interopRequireDefault(_libServerConfigJs);

var baseUrl;
var server;
// before run fn
(0, _tape2['default'])('Before run: wake up server', function (t) {
  baseUrl = 'http://' + _libServerConfigJs2['default'].hostName + ':' + _libServerConfigJs2['default'].PORT;
  (0, _libServer2['default'])(function (sv) {
    server = sv;
    t.equal(typeof server, 'object', 'server created OK');
    t.equal(typeof server.close, 'function', 'server exposes his methods');
    t.end();
  });
});

// Server tests
(0, _tape2['default'])('server sends json data', function (t) {
  var url = baseUrl + '/json';
  _request2['default'].get(url, function (err, res, body) {
    if (err) t.notOk(err, 'we dont receive an error');
    t.equal(res.statusCode, 200, 'we get a 200 status code');
    t.equal(typeof JSON.parse(body), 'object', 'we got a json object from server');
    t.end();
  });
});

(0, _tape2['default'])('server sends plain text', function (t) {
  var url = baseUrl + '/hi';
  (0, _request2['default'])(url, function (err, res, body) {
    if (err) t.notOk(err, 'we dont receive an error');
    t.equal(res.statusCode, 200, 'we get a 200 status code');
    t.equal(body, 'hi', 'receive plain text');
    t.end();
  });
});

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
(0, _tape2['default'])('Teardown: close server', function (t) {
  server.close(function () {
    t.ok(true, 'server has closed right');
    t.end();
  });
});

