import { Client, Account } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('657c52c45d5f8069842f');

export const account = new Account(client);

export default client;