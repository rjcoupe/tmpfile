# TMPFILE
A (very) simple NodeJS module designed to give you valid temporary file paths.

## Installation
`npm install tmpfile` or `yarn add tmpfile`

## Example Usage
```
const tmpfile = require('tmpfile');
const tmpFileOpts = {
  prefix: 'bill-',
  suffix: '-accounting',
  extension: '.txt'
};

const filePath = tmpfile(tmpFileOpts);
```

## Notes
* Files will be created in your OS's temp directory, e.g. `/tmp` for (most?) Linux distributions
* Prefixes and suffixes are taken exactly as they are entered - if you want symbols, e.g. hyphens, between them and the file name, be sure to include them yourself!
* You can enter an extension with or without a dot - one will be added if you miss it out.
* Entering no extension will result in an extensionless file name, which is just fine.
