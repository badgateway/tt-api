import { Client } from 'ketting';
import oauth2Client from './oauth2';
import { OAuth2Fetch } from '@badgateway/oauth2-client';

console.debug('🔗 Setting up Ketting client');
const client = new Client(process.env.AUTH_API_URI!);

const oauth2FetchWrapper = new OAuth2Fetch({
  client: oauth2Client,
  getNewToken: () => {
    return oauth2Client.clientCredentials();
  }
});

client.use(oauth2FetchWrapper.mw());

export default client;
