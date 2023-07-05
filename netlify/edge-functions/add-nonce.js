export default async (context, { log, next }) => {
  const randomNonce = generateRandomNonce();
  const response = await next(); // Retrieve the response from the next handler

  // Set the Content-Security-Policy header to nonce both scripts and styles
  response.headers.set('Content-Security-Policy', `script-src 'self' 'nonce-${randomNonce}' 'strict-dynamic' https:; style-src 'self' 'unsafe-inline'`);
  // response.headers.set('Content-Security-Policy', `script-src 'self' 'nonce-${randomNonce}' 'strict-dynamic' https:; style-src 'self' 'nonce-${randomNonce}'`);


  // Retrieve the response body as text
  const body = await response.text();

  // Modify the response body by adding the nonce attribute to script tags
  const newBody = body.replaceAll('<script>', `<script nonce="${randomNonce}">`);

  // Modify the response body by adding the nonce attribute to style tags
  // const newBody1 = newBody.replaceAll('<style>', `<style nonce="${randomNonce}">`);

  // Create a new response with the modified body and original headers
  const modifiedResponse = new Response(newBody, response);
  log('Generated random nonce');

  return modifiedResponse;
};


function generateRandomNonce() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let nonce = '';
  for (let i = 0; i < 16; i++) {
    nonce += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return nonce;
}