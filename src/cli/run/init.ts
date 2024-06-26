#!/usr/bin/env node

import { existsSync } from 'fs';
import path from 'path';

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';

import generate from '../../services/auth/generate';

const configQuestionnaire = [
  {
    type: 'input',
    name: 'clientId',
    message: 'What is the Client ID?',
  },
  {
    type: 'input',
    name: 'accessToken',
    message: 'What is the Access Token?',
  },
  {
    type: 'input',
    name: 'storeHash',
    message: 'What is the Store Hash?',
  },
  {
    type: 'input',
    name: 'channelId',
    message: 'What is the Channel ID? Note: Global applies to all storefronts',
    default: 'Global',
    validate(value: string) {
      if (value === 'Global') {
        return true;
      }

      if (isNaN(Number(value))) {
        return 'Please enter a valid number';
      }

      return true;
    },
  },
];

const init = () => {
  const program = new Command('init');

  return program
    .description('Initialization of email builder configuration')
    .usage(' ')
    .action(() => {
      console.log(chalk.cyan('Thank you for using Email Builder'));
      console.log(`
            
This guide will help you get your environment set up.

Before continuing, please make sure you've created or received a Store API account.
You'll need those credentials in order to generate the appropriate configurations.
The scope you'll need is: Information & Settings (Modify). 	
You can find more information here. https://support.bigcommerce.com/s/article/Store-API-Accounts#creating
`);
      inquirer
        .prompt([
          {
            type: 'confirm',
            name: 'isReady',
            message:
              'Are you ready to continue? You may press any key to continue',
          },
          {
            type: 'confirm',
            name: 'shouldOverwrite',
            message:
              'It looks like you already have a configuration file, this will overwrite it. Are you sure?',
            when() {
              return existsSync(`${path.resolve('.')}/.env`);
            },
          },
        ])
        .then(({ isReady, shouldOverwrite }) => {
          if (!isReady && !shouldOverwrite) {
            console.log(`
Please re-run the init walk through when you are ready!
`);
            return;
          }

          inquirer
            .prompt(configQuestionnaire)
            .then(answers => {
              generate.configurations(answers);
            })
            .catch((error: any) => {
              console.log(error);
            });
        });
    });
};

export default init;
