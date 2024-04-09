#!/usr/bin/env node

import { Command } from 'commander';

import download from './download';
import publish from './publish';
import init from './run/init';

// eslint-disable-next-line @typescript-eslint/no-var-requires, unicorn/prefer-module
const { version } = require('../../package.json');

const cli = new Command();

cli
  .version(version)
  .addCommand(init())
  .addCommand(download())
  .addCommand(publish());

cli.parse(process.argv);
