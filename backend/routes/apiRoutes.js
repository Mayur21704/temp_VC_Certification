const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');

// POST request to create a certificate
router.post('/issue', issueController.issueCredential);

// GET request to see all issued certificates
router.get('/credentials', issueController.getAllCredentials);

module.exports = router;