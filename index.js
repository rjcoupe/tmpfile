'use strict';

var path = require('path');
var fs = require('fs');
var tmpDir = require('os').tmpdir();
var crypto = require('crypto');

function _getRandomString() {
  return Math.random().toString(36).substr(2, 24);
}

function _generateFileName(opts = {}) {
  var extension = opts.extension ? _validateExtension(opts.extension) : '';
  return (opts.prefix || '') + _getRandomString() + (opts.suffix || '') + extension;
}

function _checkIfFileExists(fileName) {
  return fs.existsSync(path.join(tmpDir, fileName));
}

function _validateExtension(extension) {
  return extension[0] === '.' ? extension : '.' + extension;
}

module.exports = function(opts = {}) {
  var filePath = path.join(tmpDir, _generateFileName(opts));
  if (opts.extension) {

  }
  while(_checkIfFileExists(filePath) === true) {
    filePath = path.join(tmpDir, _generateFileName(opts));
  }
  return filePath;
}
