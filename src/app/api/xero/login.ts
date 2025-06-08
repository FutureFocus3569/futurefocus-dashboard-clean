import { NextApiRequest, NextApiResponse } from 'next';
import { XeroClient } from 'xero-node';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const xero = new XeroClient({
    clientId: process.env.XERO_CLIENT_ID!,
    clientSecret: process.env.XERO_CLIENT_SECRET!,
    redirectUris: [process.env.XERO_REDIRECT_URI!],
    scopes: [
      'openid',
      'profile',
      'email',
      'accounting.settings',
      'accounting.transactions',
      'offline_access'
    ],
  });

  const consentUrl = await xero.buildConsentUrl();
  res.redirect(consentUrl);
}
