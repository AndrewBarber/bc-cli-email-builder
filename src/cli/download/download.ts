#!/usr/bin/env node

import { existsSync } from 'fs';
import path from 'path';

import  {Command, Argument} from 'commander';


import downloadEmailTemplate from '../../services/emailTemplate/downloadEmailTemplate';
import { log, messages } from '../../messages';
import checkCredentials from '../../services/auth/checkAuth';
import { AUTH_CONFIG } from '../../services/auth/authConfig';
import { EMAIL_TEMPLATE_TYPE_IDS } from '../../services/emailTemplate/emailTemplateTypes';

const emailTemplateDownload = () => {
    const program = new Command('download');

    return program
        .addArgument(new Argument('[email-template]', 'Email template to download from store').default('all'))
        .option('-p, --path <path>', 'Path to download the email template', './templates')
        .option('-o, --overwrite', 'Overwrite the email template if it already exists', false)
        .description('Download the email templates to the store belonging to the env config')
        .action((emailTemplate: string, options) => {
            const { path, overwrite } = options;
            if (!checkCredentials(AUTH_CONFIG)) {
                process.exit(1);
            }


            // if emailTemplate is not all, check if it is a valid email template type
            if (emailTemplate !== 'all' && !EMAIL_TEMPLATE_TYPE_IDS.includes(emailTemplate)) {
                log.error(messages.invalidEmailTemplateType);
                process.exit(1);
            }
     
            // if the email template is defined and the directory exists
            if (emailTemplate !== 'all' && (existsSync(emailTemplate) && !overwrite)) {
                log.error(messages.emailTemplateExists);
                process.exit(1);
            }
            

            downloadEmailTemplate(emailTemplate, path, overwrite);

        });
};

export default emailTemplateDownload;
