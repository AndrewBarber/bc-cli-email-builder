import chalk from 'chalk';

function f(message: string) {
    return `[${new Date().toISOString()}] ${message}`;
}

/* eslint-disable no-console */
export const log = {
    debug: (message: string) => console.debug(chalk.grey(f(message))),
    info: (message: string) => console.log(chalk.blue(f(message))),
    notice: (message: string) => console.log(chalk.yellow(f(message))),
    error: (message: string) => console.error(chalk.red(f(message))),
    success: (message: string) => console.log(chalk.green(f(message))),
};
/* eslint-enable no-console */
export const messages = {
    invalidAuth: (configKey: string) => `${configKey} is invalid.`,
    invalidEmailTemplateType: 'Invalid email template type.',
    emailTemplateExists: 'Email template already exists. Please supply with overtwrite flag if you want to overwrite it.',
    noEmailTemplateFound: 'No email template found.',
};
/* eslint-enable max-len */
