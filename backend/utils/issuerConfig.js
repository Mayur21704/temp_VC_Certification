const { createVerifiableCredentialJwt } = require('did-jwt-vc');
const { ES256KSigner } = require('did-jwt');
require('dotenv').config();

// Private Key se Signer banao
const privateKeyHex = process.env.ISSUER_PRIVATE_KEY;
const signer = ES256KSigner(privateKeyHex);

// Hum 'did:ethr' use kar rahe hain (Ethereum based ID structure, simple & standard)
// Asli production mein hum 'did:web' use karte hain domain ke liye.
// Address derive karne ke liye ek dummy step (simplification ke liye):
const { EthrDID } = require('did-jwt-vc'); // Logic conceptual hai

// Is project ke liye hum dynamic DID generation use karenge controller mein.
module.exports = { signer, privateKeyHex };