var compileES6 = require('broccoli-es6-concatenator');
var concat = require('broccoli-concat');

var app = 'lib';

app = concat(app, {
  inputFiles: [
    '**/*.js'
  ],
  outputFile: '/ie8Shims.js',
});

var sourceTree = compileES6(app, {
  inputFiles: [
    '**/*.js'
  ],
  wrapInEval: false,
  outputFile: '/ie8-shims.js'
});

module.exports = sourceTree;
