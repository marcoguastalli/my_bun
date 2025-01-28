import crypto from 'crypto'; // Node.js crypto module for PKCE
import fetch from 'node-fetch'; // Bun supports fetch natively, but this is for demonstration.
import dotenv from 'dotenv'; // To load environment variables from .env

// Load environment variables from .env file
dotenv.config(); 

// Helper function to generate a random string (code verifier)
function generateCodeVerifier(): string {
  return crypto.randomBytes(32).toString('base64url');
}

// Helper function to generate the code challenge from the code verifier
function generateCodeChallenge(codeVerifier: string): string {
  const sha256 = crypto.createHash('sha256');
  sha256.update(codeVerifier);
  const hash = sha256.digest('base64url');
  return hash;
}

interface OAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
  grant_type?: string;
  client_id?: string;
  redirect_uri?: string;
  scope_param?: string;
  response_type?: string;
  response_mode?: string;
  code_challenge_method?: string;
  code_challenge?: string;
  state?: string;
  nonce?: string;
}

export async function getOAuthToken(
  clientId: string,
  authorizationUrl: string,
  redirectUri: string,
  grantType: string,
  codeVerifier: string,
  scope: string,
  responseType: string,
  responseMode: string,
  codeChallengeMethod: string,
  codeChallenge: string,
  state: string,
  nonce: string
): Promise<OAuthResponse> {
  try {
    const response = await fetch(authorizationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        grant_type: grantType,
        scope: scope,
        response_type: responseType,
        response_mode: responseMode,
        code_challenge_method: codeChallengeMethod,
        code_challenge: codeChallenge,
        state: state,
        nonce: nonce,
      }).toString(),
    });

    if (!response.ok) {
      throw new Error('Failed to retrieve token');
    }

    const data = await response;
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error obtaining OAuth token:', error);
    throw error;
  }
}

// Example usage
(async () => {
  const clientId = process.env.CLIENT_ID
  const authorizationUrl = process.env.AUTHORIZATION_URL
  const redirectUri = process.env.REDIRECT_URI
  const grantType = process.env.GRANT_TYPE
  const scope = process.env.SCOPE
  const responseType = process.env.RESPONSE_TYPE
  const responseMode = process.env.RESPONSE_MODE
  const codeChallengeMethod = process.env.CODE_CHALLENGE_METHOD
  const state = process.env.STATE
  const nonce = process.env.NONCE

  // Generate the code verifier and code challenge
  const codeVerifier = generateCodeVerifier();
  console.log('Code Verifier:', codeVerifier);

  try {
    const codeChallenge = generateCodeChallenge(codeVerifier);

    const tokenResponse = await getOAuthToken(
      clientId,
      authorizationUrl,
      redirectUri,
      grantType,
      codeVerifier,
      scope,
      responseType,
      responseMode,
      codeChallengeMethod,
      codeChallenge,
      state,
      nonce
    );

    console.log('Access Token:', tokenResponse.access_token);
    // Use the token in further API calls
  } catch (error) {
    console.error('Error:', error);
  }
})();
