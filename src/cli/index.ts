#!/usr/bin/env node

import { Command } from 'commander';

import downloadEmailTemplate from './download';
import init from './run/init';

// eslint-disable-next-line @typescript-eslint/no-var-requires, unicorn/prefer-module
const { version } = require('../../package.json');

const cli = new Command();

cli.version(version).addCommand(init())
  .addCommand(downloadEmailTemplate());

cli.parse(process.argv);
