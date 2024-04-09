#!/usr/bin/env node

import { existsSync } from 'fs';

import { Command, Argument } from 'commander';

// import publishEmailTemplate from '../../services/emailTemplate/publishEmailTemplate';
import { log, messages } from '../../messages';
import checkCredentials from '../../services/auth/checkAuth';
import { AUTH_CONFIG } from '../../services/auth/authConfig';
import { EMAIL_TEMPLATE_TYPE_IDS } from '../../services/emailTemplate/emailTemplateTypes';

const publish = () => {
  const program = new Command('publish');

  return program
    .addArgument(
      new Argument(
        '[email-template]',
        'Email template to upload to store',
      ).default('all'),
    )
    .option(
      '-p, --path <path>',
      'Path to upload the email template',
      './templates',
    )
    .description(
      'Upload the email templates to the store belonging to the env config',
    )
    .action((emailTemplate: string, options) => {
      const { path } = options;
      if (!checkCredentials(AUTH_CONFIG)) {
        process.exit(1);
      }
    });
};

export default publish;
