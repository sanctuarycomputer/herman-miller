const funnel = require('broccoli-funnel');
const concat = require('broccoli-concat');
const mergeTrees = require('broccoli-merge-trees');
const babelTranspiler = require('broccoli-babel-transpiler');

const pkg = require('./package.json');
const src = 'src';

/* Find index.html */
const html = funnel(src, {
  files: ['index.html']
});

const env = funnel(src, {
  files: ['.env']
});

const static = funnel(src, {
  srcDir: '.static',
  destDir: '.static'
});

const assets = funnel(src, {
  srcDir: 'assets',
  destDir: 'assets'
});

const npmPath = 'node_modules';
var npmComponents = [
  'loader.js/loader.js',
  'react/dist/react.js',
  'radium/dist/radium.js',
  'interact.js/interact.js',
  'rsvp/dist/rsvp.js',
  'howler/howler.js',
  'dynamics.js/lib/dynamics.js'
]

const vendorPath = 'vendor';
var vendorComponents = [
  'html2canvas/html2canvas.min.js',
  'download.js/download.js',
  'fabric.js/fabric.min.js'
]

/* Load Vendor Libs Js */
const npmJs = funnel(npmPath, {
  files: npmComponents
});

const vendorJs = funnel(vendorPath, {
  files: vendorComponents 
});

/* Compile JS */
const srcJs = babelTranspiler(src, {
  stage: 0,
  moduleIds: true,
  modules: 'amd',
  getModuleId: function (name) { 
    return name.replace(/^js/, pkg.name);
  }
});

const allJs = mergeTrees([npmJs, vendorJs, srcJs]);

/* Ensure Bower Files are loaded first */
const inputFileOrder = npmComponents.concat(vendorComponents).concat(['js/**/*.js']);

/* Concat all JS */
const js = concat(allJs, {
  inputFiles: inputFileOrder,
  outputFile: '/' + pkg.name + '.js',
  footer: 'require("herman-miller/app");'
});

/* Output JS Files & Index HTML */
module.exports = mergeTrees([html, js, assets, env, static]);
