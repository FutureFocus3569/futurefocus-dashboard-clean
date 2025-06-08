import { XeroClient, TokenSet } from 'xero-node';

let savedTokenSet: TokenSet | undefined;

export const xero = new XeroClient({
  clientId: process.env.XERO_CLIENT_ID!,
  clientSecret: process.env.XERO_CLIENT_SECRET!,
  redirectUris: ['http://localhost:3000/api/xero/callback'],
  scopes: ['openid', 'profile', 'email', 'accounting.reports.read', 'accounting.transactions.read'],
});

export async function saveTokenSet(tokenSet: TokenSet) {
  savedTokenSet = tokenSet;
}

export async function loadTokenSet() {
  if (savedTokenSet) {
    await xero.setTokenSet(savedTokenSet);
  }
}
