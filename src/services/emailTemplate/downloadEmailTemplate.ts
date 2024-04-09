import fs from "fs";
import { Management } from "@space48/bigcommerce-api";
import { omit } from "lodash";
import dotenv from "dotenv";
import { messages, log } from "../../messages";
dotenv.config();

const bcClient = new Management.Client({
  accessToken: process.env.BC_ACCESS_TOKEN as string,
  storeHash: process.env.BC_STORE_HASH as string,
});

const downloadEmailTemplate = async (templateName: string, path: string, overwrite: false) => {
  try {
    const isFetchAll = templateName === "all";

    if (isFetchAll) {
      const emailTemplatesResponse = await getAllEmailTemplates(bcClient);
      if (!emailTemplatesResponse) return log.error(messages.noEmailTemplateFound(templateName));
    }

    if (!isFetchAll) {
      const emailTemplateResponse = await getEmailTemplate(bcClient, templateName);
      if (!emailTemplateResponse) return log.error(messages.noEmailTemplateFound(templateName));

      // create a directory for the email template
      // structure will be like this: path/templateName/

      const emailTemplateDir = `${path}/${templateName}`;
      if (fs.existsSync(emailTemplateDir) && !overwrite) {
        return log.error(messages.emailTemplateExists);
      }
      fs.mkdirSync(emailTemplateDir, { recursive: true });

      // write the email template to a file
      await Promise.all([
        fs.writeFileSync(`${emailTemplateDir}/${templateName}.json`, JSON.stringify(omit(emailTemplateResponse, "body"))),
        fs.writeFileSync(`${emailTemplateDir}/${templateName}.hbs`, emailTemplateResponse.body),
      ]);
    }
  } catch (error) {
    log.error(error);
  }
};

const getAllEmailTemplates = async (
  bigCommerceApiClient: Management.Client,
  query?: Management.V3.Operations["GET /marketing/email-templates"]["parameters"]["query"],
) => await bigCommerceApiClient.v3.get("/marketing/email-templates", { query });

const getEmailTemplate = async (
  bigCommerceApiClient: Management.Client,
  templateName: string,
  query?: Management.V3.Operations["GET /marketing/email-templates/{template-name}"]["parameters"]["query"],
) =>
  await bigCommerceApiClient.v3.get(`/marketing/email-templates/{template-name}`, {
    path: {
      "template-name": templateName,
    },
    query,
  });

export default downloadEmailTemplate;
