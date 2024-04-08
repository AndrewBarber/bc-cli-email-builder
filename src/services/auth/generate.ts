#!/usr/bin/env node

import { writeFileSync } from 'fs';
import { resolve } from 'path';

import { log } from '../../messages';

interface EnvironmentInterface {
    clientId: string;
    accessToken: string;
    storeHash: string;
}

const generateConfig = ({
    clientId, accessToken, storeHash,
}: EnvironmentInterface) => {
    const dir = resolve('.');
    const configuration = `
BC_CLIENT_ID=${clientId}
BC_ACCESS_TOKEN=${accessToken}
BC_CHANNEL_ID=1
BC_STORE_HASH=${storeHash}
`;

    try {
        writeFileSync(`${dir}/.env`, configuration);
        log.success('Successfully created your configuration, you\'re all set!');
    } catch (e) {
        log.error('There seemed to be an error creating the file.');
    }
};

export default {
    configurations: generateConfig,
};
