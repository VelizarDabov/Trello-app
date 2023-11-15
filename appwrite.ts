import { Client, Account, ID, Databases, Storage } from 'appwrite';
const projectId = '655354d3b6d58fdcf941'
const client = new Client().setEndpoint('https://cloud.appwrite.io/v1').setProject(projectId)


const account = new Account(client);
const databases = new Databases(client)
const storage = new Storage(client);
export {client, account, databases, storage, ID}