const express = require('express');
const sauceCtrler = require('../controllers/sauces');
const router = express.Router();
const multer = require('../middleware/multer-config');

router.get('/', sauceCtrler.getAllSauces);
router.get('/:id', sauceCtrler.getOneSauce);
router.post('/', multer, sauceCtrler.newSauce);
router.put('/:id', multer, sauceCtrler.updateSauce);
router.delete('/:id', sauceCtrler.deleteSauce);
router.post('/:id/like', sauceCtrler.likeSauce);

module.exports = router;