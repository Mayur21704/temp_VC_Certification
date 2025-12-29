const CredentialModel = require('../models/credentialModel');
const { createVerifiableCredentialJwt } = require('did-jwt-vc');
const { ES256KSigner } = require('did-jwt');

// Issuer ka setup
const ISSUER_PRIVATE_KEY = process.env.ISSUER_PRIVATE_KEY;
const signer = ES256KSigner(ISSUER_PRIVATE_KEY);

// Issuer ki DID (Identity). 
// Note: Real world mein ye "did:web:university.com" hota hai. 
// Learning ke liye hum ek static DID maan lete hain jo key se juda hai.
const ISSUER_DID = 'did:ethr:0x' + require('crypto').createHash('sha256').update(ISSUER_PRIVATE_KEY).digest('hex').substring(0, 40);

exports.issueCredential = async (req, res) => {
    try {
        const { studentName, courseName, studentDid } = req.body;

        // Validation
        if (!studentDid) {
            return res.status(400).json({ message: "Student DID is required!" });
        }

        // 1. Payload Setup (W3C Standard Format)
        const vcPayload = {
            sub: studentDid, // Subject (Student ka DID)
            nbf: Math.floor(Date.now() / 1000), // Not Before
            vc: {
                '@context': ['https://www.w3.org/2018/credentials/v1'],
                type: ['VerifiableCredential', 'UniversityDegreeCredential'],
                credentialSubject: {
                    degree: {
                        type: 'BachelorDegree',
                        name: 'Bachelor of Science'
                    },
                    student: {
                        name: studentName,
                        course: courseName
                    }
                }
            }
        };

        // 2. Signing the Credential using DID-JWT-VC
        // Yeh function magic karega: JSON ko cryptographically sign karega issuer ki key se
        const vcJwt = await createVerifiableCredentialJwt(vcPayload, {
            did: ISSUER_DID,
            signer: signer,
        });

        console.log("Generated VC JWT:", vcJwt);

        // 3. Database mein save karo
        const credentialData = {
            credentialId: `vc-${Date.now()}`,
            studentName,
            courseName,
            studentDid,
            issuerDid: ISSUER_DID,
            jwtVc: vcJwt
        };

        await CredentialModel.create(credentialData);

        // 4. Response
        res.status(201).json({
            message: "Verifiable Credential Issued Successfully!",
            verifiableCredential: vcJwt, // Yeh string Mayur ke wallet mein jayegi
            issuer: ISSUER_DID
        });

    } catch (error) {
        console.error("Issuance Error:", error);
        res.status(500).json({ message: "Error issuing credential", error: error.message });
    }
};

exports.getAllCredentials = async (req, res) => {
    try {
        const [rows] = await CredentialModel.getAll();
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: "Database Error" });
    }
};