import { Client, Account, Databases } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('657c52c45d5f8069842f');

export const account = new Account(client);

// Database

export const databases = new Databases(client, "657ee0306afa5a50bd2a")