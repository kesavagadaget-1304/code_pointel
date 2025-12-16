// utils/getPulsarToken.ts
import { APIRequestContext } from '@playwright/test';
import qs from 'qs';

export async function getPulsarToken(request: APIRequestContext): Promise<string> {
  const tokenUrl = 'https://ws-preprod.eng.toasttab.com/authentication/v1/authentication/customer/oauth/token';

  const res = await request.post(tokenUrl, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify({
      client_id: 'NA9M9nVDcgPz1s9aFHfv2h5oauCsS4px',
      client_secret: 'VGPH9We7bNx2PK6AtMVoDu8DA3I8PkrnT5WqMgowqFkloLXLVAGhQfRFdKPDoE02',
      grant_type: 'client_credentials'
    })
  });

  if (!res.ok()) throw new Error('Failed to fetch Pulsar token');

  const body = await res.json();
  return body.access_token;
} 