import chalk from "chalk";

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
  invalidEmailTemplateType: (templateName: string) => `Invalid email template type - ${templateName}.`,
  emailTemplateExists: (templateName: string) =>
    `Email template (${templateName}) already exists. Please supply with overwrite flag if you want to overwrite it.`,
  noEmailTemplateFound: (templateName: string) => `No email template found - ${templateName}.`,
};
/* eslint-enable max-len */
