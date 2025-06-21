#!/usr/bin/env node
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { printKoalaArt } = require('../index');

const argv = yargs(hideBin(process.argv))
  .scriptName('npx kool-koala')
  .command('*', 'Default command', (yargs) => {
    printKoalaArt();
  })
  .usage('$0 [args]')
  .help('h')
  .alias('h', 'help').argv;
