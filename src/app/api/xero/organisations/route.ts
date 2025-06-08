import { xero, loadTokenSet } from '@/lib/xeroClient';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await loadTokenSet();  // 🆕 Load saved tokens

    const tenantId = xero.tenantIds?.[0];
    if (!tenantId) {
      throw new Error('No tenant connected');
    }

    const orgsResponse = await xero.accountingApi.getOrganisations({ xeroTenantId: tenantId });
    return NextResponse.json({ organisations: orgsResponse.body.organisations });
  } catch (error: any) {
    console.error('❌ Organisations fetch failed:', error);
    return NextResponse.json({ error: 'Fetch failed', details: error }, { status: 500 });
  }
}
