// src/app/api/xero/callback/route.ts
import { xero, saveTokenSet } from '@/lib/xeroClient';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const tokenSet = await xero.apiCallback(request.url);
    await saveTokenSet(tokenSet);               // Save to memory
    await xero.setTokenSet(tokenSet);           // Set tokens on client

    const allTenants = await xero.updateTenants();
    xero.tenantIds = allTenants.map(t => t.tenantId);  // 🔥 REQUIRED

    console.log('✅ TokenSet:', {
      accessToken: tokenSet.access_token,
      expiresIn: tokenSet.expires_in,
      refreshToken: tokenSet.refresh_token
    });
    console.log('✅ Tenants:', allTenants);

    return NextResponse.json({
      message: 'Xero connected!',
      tokenSet,
      allTenants
    });
  } catch (error: any) {
    console.error('❌ Xero callback error:', error);
    return NextResponse.json(
      { error: 'Callback failed', details: error },
      { status: 500 }
    );
  }
}
