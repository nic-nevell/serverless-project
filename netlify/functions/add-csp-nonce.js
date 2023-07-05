const jsdom = require('jsdom')


exports.handler = async function (event, context) {
  const nonce = generateRandomNonce();

  return {
    statusCode: 200,
    headers: {
      'Content-Security-Policy': `script-src 'self' 'nonce-${nonce}' 'unsafe-inline' 'unsafe-eval'`,
    },
    body: JSON.stringify({ nonce }),
  };
};

function generateRandomNonce() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let nonce = '';
  for (let i = 0; i < 16; i++) {
    nonce += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return nonce;
}


// < script >
//   async function addNonceToCSP() {
//     const response = await fetch('/.netlify/functions/add-nonce');
//     const { nonce } = await response.json();

//     const scriptTags = document.getElementsByTagName('script');
//     for (let i = 0; i < scriptTags.length; i++) {
//       scriptTags[i].setAttribute('nonce', nonce);
//     }
//   }

// addNonceToCSP();
// </script >
