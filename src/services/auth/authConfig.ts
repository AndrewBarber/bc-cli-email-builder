import dotenv from 'dotenv';

dotenv.config();

export interface AuthConfig {
    clientId: string;
    storeHash: string;
    accessToken: string;
}

export const AUTH_CONFIG: AuthConfig = {
    clientId: process.env.BC_CLIENT_ID || '',
    storeHash: process.env.BC_STORE_HASH || '',
    accessToken: process.env.BC_ACCESS_TOKEN || '',
};

export const CHANNEL_ID = process.env.BC_CHANNEL_ID ? parseInt(process.env.BC_CHANNEL_ID, 10) : 1;
