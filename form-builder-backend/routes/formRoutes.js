const express = require('express');
const { saveForm } = require('../controllers/formController');

const router = express.Router();

router.post('/saveform', saveForm);

module.exports = router;
