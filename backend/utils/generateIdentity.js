const { createReferenceIdentity } = require('did-jwt-vc');
// Note: Yeh sirf ek baar run karke Keys generate karne ke liye hai.

const generate = () => {
    // Hum ek random hex string bana rahe hain jo Private Key banegi
    const randomHex = require('crypto').randomBytes(32).toString('hex');
    console.log("=== COPY THESE TO YOUR .ENV FILE ===");
    console.log(`ISSUER_PRIVATE_KEY=${randomHex}`);
    
    // DID usually public key ya address se banta hai, hum runtime par derive karenge
    console.log("DID will be derived from this key automatically.");
};

generate();