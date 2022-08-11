const express = require('express');
const userCtrler = require('../controllers/user');

const router = express.Router();

router.post('/login', userCtrler.login);
router.post('/signup', userCtrler.signup);

module.exports = router;