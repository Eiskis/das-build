// Run all the things
var rawArgs = require('yargs').argv;
var Builder = require('das-build');
var main = new Builder(rawArgs);
main.run();
