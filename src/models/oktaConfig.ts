export const oktaConfig = {
    clientId: '0oaigke4fdAnyySbg5d7',
    issuer: 'https://dev-14905665.okta.com/oauth2/default',
    redirectUri: 'https://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
}