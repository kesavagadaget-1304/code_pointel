import { APIRequestContext, expect } from '@playwright/test';

// Token cache with expiry
let cachedToken: string | null = null;
let tokenExpiryTime: number = 0;

/**
 * Get access token using Toast authentication (cached with expiry)
 * @param request - Playwright API request context
 * @returns Promise<string> - The access token
 */
export async function getAccessToken(request: APIRequestContext): Promise<string> {
  const now = Date.now();

  // Return cached token if valid
  if (cachedToken && now < tokenExpiryTime) {
    return cachedToken;
  }

  // Fetch new token
  const authUrl = process.env.API_TOKEN_URL;
  if (!authUrl) {
    throw new Error('API_TOKEN_URL environment variable is required');
  }
  
  const res = await request.post(authUrl, {
    data: {
      userAccessType: 'TOAST_MACHINE_CLIENT',
      clientId: process.env.API_CLIENT_ID,
      clientSecret: process.env.API_CLIENT_SECRET
    }
  });
  
  await expect(res).toBeOK();
  const json = await res.json();
  
  // Store token and set expiry (5 minutes)
  const token = json.token?.accessToken || json.accessToken || json.access_token || json.token;
  if (!token) {
    throw new Error('No access token received from authentication endpoint');
  }
  
  cachedToken = token;
  tokenExpiryTime = now + (5 * 60 * 1000);
  
  return token;
}