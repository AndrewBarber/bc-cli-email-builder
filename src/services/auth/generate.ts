#!/usr/bin/env node

import { writeFileSync } from 'fs';
import { resolve } from 'path';

import { log } from '../../messages';

interface EnvironmentInterface {
  clientId: string;
  accessToken: string;
  storeHash: number;
  channelId: string | number;
}

const generateConfig = ({
  clientId,
  accessToken,
  storeHash,
  channelId,
}: EnvironmentInterface) => {
  const dir = resolve('.');
  const channelIdSelected =
    typeof channelId === 'string' && channelId.toLowerCase() === 'global'
      ? 0
      : channelId || 0;
  const configuration = `BC_CLIENT_ID=${clientId}
BC_ACCESS_TOKEN=${accessToken}
BC_CHANNEL_ID=${channelIdSelected}
BC_STORE_HASH=${storeHash}
`;

  try {
    writeFileSync(`${dir}/.env`, configuration);
    log.success("Successfully created your configuration, you're all set!");
  } catch (e) {
    log.error('There seemed to be an error creating the file.');
  }
};

export default {
  configurations: generateConfig,
};
