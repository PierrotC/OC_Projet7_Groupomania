const express = require('express');
const userCtrler = require('../controllers/user');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/login', userCtrler.login);
router.post('/signup', userCtrler.signup);
router.delete('/:id', auth, userCtrler.deleteAccount);
router.put('/:id', auth, userCtrler.modifyAccount);

module.exports = router;