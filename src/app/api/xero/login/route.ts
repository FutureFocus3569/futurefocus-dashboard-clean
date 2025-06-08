import { xero } from '@/lib/xeroClient';
import { NextResponse } from 'next/server';

export async function GET() {
  const consentUrl = await xero.buildConsentUrl(); // Uses default from xeroClient.ts
  return NextResponse.redirect(consentUrl);
}
