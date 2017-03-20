'use strict';

const assert = require('assert');
const os = require('os');
const sinon = require('sinon');
const tmpfile = require('../index');

let opts;

describe('index.test.js', function() {
  beforeEach(function() {

  });

  describe('Calling with no options passed', function() {
    it('should return a file name of 24 characters\' length', function() {
      const filePath = tmpfile();
      const fileName = filePath.split('/').slice(-1)[0];
      assert.equal(fileName.length, 24, 'Generated file name is not 24 characters in length');
    });

    it('should not return a string starting with a dot', function() {
      const filePath = tmpfile();
      assert.notEqual(filePath.slice(1)[0], '.', 'Generated file name starts in a .');
    });

    it('should not return a string concluding in a dot', function() {
      const filePath = tmpfile();
      assert.notEqual(filePath.slice(-1)[0], '.', 'Generated file name ends in a .');
    });
  });

  describe('Calling with a specified prefix', function() {
    beforeEach(function() {
      opts = {
        prefix: 'TEST_PREFIX'
      };
    });

    it('should attach the prefix at the start of the file name, exactly as given', function() {
      const filePath = tmpfile(opts);
      const fileName = filePath.split('/').slice(-1)[0];
      const prefix = fileName.substr(0, 11);
      assert.equal(prefix, opts.prefix, 'The prefix supplied was not correctly prepended to the filename');
    });
  });

  describe('Calling with a specified suffix', function() {
    beforeEach(function() {
      opts = {
        suffix: 'TEST_SUFFIX'
      };
    });

    it('should attach the suffix at the end of the file name, exactly as given', function() {
      const filePath = tmpfile(opts);
      const fileName = filePath.split('/').slice(-1)[0];
      const suffix = fileName.slice(-11);
      assert.equal(suffix, opts.suffix, 'The suffix supplied was not correctly appended to the filename');
    });

    it('should insert the suffix before the extension', function() {
      opts.extension = 'jpg';
      const filePath = tmpfile(opts);
      const fileName = filePath.split('/').slice(-1)[0];
      const endOfFilePath = fileName.slice(-15);
      assert.equal(endOfFilePath, opts.suffix + '.jpg', 'The suffix supplied was not correctly appended to the filename');
    });
  });

  describe('Calling with a specified extension', function() {
    beforeEach(function() {
      opts = {
        extension: '.jpg'
      };
    });

    it('should attach the extension to the very end of the file name', function() {
      const filePath = tmpfile(opts);
      const endOfFilePath = filePath.slice(-4);
      assert.equal(endOfFilePath, opts.extension, 'The extension was not correctly appended to the filename');
    });

    it('should inject a . before the extension if none is provided', function() {
      opts.extension = 'jpg';
      const filePath = tmpfile(opts);
      const endOfFilePath = filePath.slice(-4);
      assert.equal(endOfFilePath, '.' + opts.extension, 'The extension was not correctly appended to the filename');
    });

    it('should never add a second dot before the extension', function() {
      opts.extension = '.jpg';
      const filePath = tmpfile(opts);
      const endOfFilePath = filePath.slice(-5);
      assert.notEqual(endOfFilePath[0], '.', 'Two dots appear before the file extension');
    });
  });
});
