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

const BC_CHANNEL_ID = process.env.BC_CHANNEL_ID || 1;

const downloadEmailTemplate = async (templateName: string, path: string, overwrite: false) => {
  try {
    const isFetchAll = templateName === "all";

    if (isFetchAll) {
      const emailTemplatesResponse = await getAllEmailTemplates(bcClient, {
        channel_id: BC_CHANNEL_ID,
      });
      if (!emailTemplatesResponse) return log.error(messages.noEmailTemplateFound(templateName));

      await Promise.all(emailTemplatesResponse.map((emailTemplate) => saveEmailTemplate(emailTemplate.type_id, path, emailTemplate)));
    }

    if (!isFetchAll) {
      const emailTemplateResponse = await getEmailTemplate(bcClient, templateName, {
        channel_id: BC_CHANNEL_ID,
      });
      if (!emailTemplateResponse) return log.error(messages.noEmailTemplateFound(templateName));

      await saveEmailTemplate(templateName, path, emailTemplateResponse);
    }
  } catch (error) {
    log.error(error);
  }
};

const saveEmailTemplate = async (templateName: string, path: string, emailTemplateResponse: any) => {
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
