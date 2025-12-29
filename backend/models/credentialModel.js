const db = require('../config/db');

class CredentialModel {
    static async create(data) {
        const sql = `
            INSERT INTO certificates 
            (credential_id, student_name, course_name, student_did, issuer_did, jwt_vc) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const values = [
            data.credentialId,
            data.studentName,
            data.courseName,
            data.studentDid,
            data.issuerDid,
            data.jwtVc
        ];
        return db.execute(sql, values);
    }

    static async getAll() {
        return db.execute('SELECT * FROM certificates ORDER BY issue_date DESC');
    }
}

module.exports = CredentialModel;