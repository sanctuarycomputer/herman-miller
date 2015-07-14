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

const assets = funnel('assets');

const npmPath = 'node_modules';

var npmComponents = [
  'loader.js/loader.js',
  'react/dist/react.js',
  'radium/dist/radium.js',
  'interact.js/interact.js'
]

/* Load Vendor Libs Js */
const npmJs = funnel(npmPath, {
  files: npmComponents
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

const allJs = mergeTrees([npmJs, srcJs]);

/* Ensure Bower Files are loaded first */
const inputFileOrder = npmComponents.concat(['js/**/*.js']);

/* Concat all JS */
const js = concat(allJs, {
  inputFiles: inputFileOrder,
  outputFile: '/' + pkg.name + '.js',
  footer: 'require("herman-miller/app");'
});

/* Output JS Files & Index HTML */
module.exports = mergeTrees([html, js, assets]);
